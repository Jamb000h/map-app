# Map app

A simple frontend that displays a Google map and then fetches points of interest from a [custom API] (https://github.com/Jamb000h/map-app-api) and allows adding, updating and deleting the points of interest.

Runs on [create-react-app] (https://github.com/facebookincubator/create-react-app).

Features:
- React
- ES6

## Running the application

### Environment variables

Supply your own .env file with the following

```
REACT_APP_APIURL=URL_TO_YOUR_API
REACT_APP_GOOGLE_MAPS_APIKEY=YOUR_GOOGLE_MAPS_API_KEY
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.