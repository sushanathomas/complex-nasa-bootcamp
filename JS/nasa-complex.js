document.querySelector('button').addEventListener('click', nasaClickMe);

function nasaClickMe() {
    const url = 'https://data.nasa.gov/docs/legacy/NASA_Facilities/NASA_Facilities_rows.json';
    const value = Number(document.querySelector('select').value);
    const myKey = document.querySelector('#weatherKey').value.trim();
    const button = document.querySelector('button');
    const status = document.querySelector('#status');
    const tableBody = document.querySelector('tbody');

    if (!myKey) {
        status.innerText = 'Please enter your WeatherAPI key.';
        return;
    }

    button.disabled = true;
    tableBody.innerHTML = '';
    status.innerText = 'Loading facilities...';
    let usingSavedData = false;
    const weatherRequests = {};

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('NASA request failed.');
            return response.json();
        })
        .then(data => {
            // NASA's archived download contains column names and arrays of rows.
            const columns = data.meta.view.columns;
            return data.data.map(row => {
                const facility = {};
                columns.forEach((column, index) => {
                    facility[column.fieldName] = row[index];
                });
                return facility;
            });
        })
        .catch(() => {
            // If NASA blocks browser access, use the official data saved here.
            usingSavedData = true;
            return fetch('data/nasa-facilities.json').then(response => {
                if (!response.ok) throw new Error('Open the project with Live Server to load the saved data.');
                return response.json();
            });
        })
        .then(parseData => {
            const count = Math.min(value, parseData.length);
            const jobs = [];

            for (let i = 0; i < count; i++) {
                const column = document.createElement('tr');
                const facility = parseData[i];
                const city = facility.city;
                const nameCell = document.createElement('td');
                const locationCell = document.createElement('td');
                const weatherCell = document.createElement('td');

                // textContent displays API values as plain text.
                nameCell.textContent = facility.facility || 'Unnamed facility';
                locationCell.textContent = [city, facility.state, facility.country].filter(Boolean).join(', ') || 'Location unavailable';
                weatherCell.textContent = 'Loading...';
                column.append(nameCell, locationCell, weatherCell);
                tableBody.appendChild(column);

                const coordinates = facility.location;
                if (!coordinates || !coordinates[1] || !coordinates[2]) {
                    weatherCell.textContent = 'No coordinates listed';
                    continue;
                }
                const query = `${coordinates[1]},${coordinates[2]}`;

                // Facilities sharing coordinates can share a weather request.
                if (!weatherRequests[query]) {
                    weatherRequests[query] = fetch(`https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(myKey)}&q=${encodeURIComponent(query)}&aqi=no`)
                        .then(response => response.json().then(weatherData => {
                            if (!response.ok || weatherData.error) {
                                throw new Error(weatherData.error ? weatherData.error.message : 'Weather request failed');
                            }
                            return weatherData;
                        }));
                }

                const job = weatherRequests[query]
                    .then(weatherData => {
                        weatherCell.textContent = `${weatherData.current.temp_f} °F — ${weatherData.current.condition.text}`;
                    })
                    .catch(err => {
                        weatherCell.textContent = `Weather unavailable: ${err.message}`;
                    });
                jobs.push(job);
            }

            return Promise.all(jobs).then(() => {
                status.innerText = `${count} facilities displayed. Weather checks finished.${usingSavedData ? ' Using the saved NASA archive because the live request failed.' : ''}`;
            });
        })
        .catch(err => {
            status.innerText = err.message;
        })
        .finally(() => {
            button.disabled = false;
        });
}
