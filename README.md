# NASA Facilities and Weather Explorer

A web application that combines NASA facility data with current
weather information for each facility’s city.

<img width="822" height="292" alt="Complex Nasa API" src="https://github.com/user-attachments/assets/2a60e428-9a63-49a3-8cff-0083b16d5895" />

## Features

- Displays NASA facility names and cities.
- Looks up the current temperature for each city.
- Shows temperatures in Fahrenheit.
- Presents facility and weather information in a table.
- Includes a dropdown for choosing how many records to request.

## Built With

- HTML
- CSS
- JavaScript
- Fetch API
- NASA facility data
- WeatherAPI
- A CORS proxy for requesting NASA data

## How to Run

1. Download or clone this repository.
2. Open JS/nasa-complex.js and replace the myKey value with
   your own WeatherAPI key.
3. Open index.html in your browser.
4. Choose an option from the dropdown.
5. Click Find Them to load facility and weather information.

An internet connection is required. No Node.js server is needed.

## How It Works

The app requests NASA facility data through a CORS proxy and parses
the response. It creates a table row for each selected facility,
then sends a separate request to WeatherAPI using the facility’s city.

When the weather response arrives, the app adds the current
temperature to that facility’s row.

## Project Files

- index.html — page structure, controls, and results table
- CSS/nasa-complex.css — page styling
- JS/nasa-complex.js — NASA and weather requests
- README.md — project documentation

## Current Limitations

- Some dropdown labels do not match their configured record counts.
- The loop includes one additional record beyond the selected value.
- Repeated searches append results instead of clearing previous rows.
- Errors are logged in the browser console.
- Loading many facilities sends many weather requests.
- NASA results depend on the availability of the legacy dataset
  and CORS proxy.
- The weather API key is visible in the browser-side JavaScript.

## What I Practiced

- Combining data from two APIs.
- Working with promises and JSON.
- Creating table rows dynamically.
- Updating individual rows when asynchronous requests finish.
- Handling API request errors.

## Author

Sushana Thomas
