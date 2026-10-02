# 🚀 Project: Complex NASA API

### Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently. 

### How to submit your code for review:

- Fork and clone this repo
- Create a new branch called answer
- Checkout answer branch
- Push to your fork
- Issue a pull request
- Your pull request description should contain the following:
  - (1 to 5 no 3) I completed the challenge
  - (1 to 5 no 3) I feel good about my code
  - Anything specific on which you want feedback!

Example:
```
I completed the challenge: 5
I feel good about my code: 4
I'm not sure if my constructors are setup cleanly...
```

## Run this submission

Open index.html with VS Code Live Server. Enter your WeatherAPI key in the page, choose how many facilities to show, and click Find Them. Keys are not saved in the repository.

The page tries NASA's official archived JSON download first. If it fails (including browser access restrictions), it uses data/nasa-facilities.json, a copy of 485 official archived records with the fields needed by the app. The page reports when it uses this static fallback. This fallback is not a live NASA API response.

Source: https://data.nasa.gov/dataset/nasa-facilities
Download: https://data.nasa.gov/docs/legacy/NASA_Facilities/NASA_Facilities_rows.json

Weather uses the coordinates supplied in NASA's archived records, which may be shared or approximate. Facilities sharing coordinates reuse a request. Weather failures appear in the table. Weather observations are fetched when the button is clicked. A deployed production version should keep the weather key on a backend.
