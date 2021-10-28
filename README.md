This frontend React app for the voluntary project of team
creamcats. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), 
using the [Redux](https://redux.js.org/) 
and [Redux Toolkit](https://redux-toolkit.js.org/) template.
We also use [Material UI](https://mui.com/) as a main UI library.

## Production 
*Might be shut down after demo due to cost limitation* <br/>
http://creamcats.me

## Project structure

### `layout`

Store layout of the website included header, footer as well as 
Material UI global them customizations.<br />

### `models`

Store models interface declaration of all entities in the project.<br />

### `pages`

Store the main pages of the website. Each page also owns its child components.<br />

### `routes`

Store the routes declaration, where we can config 
routes for pages and user authentication route.<br />

### `services`

Contains entities services that have duty to call backend API 
and return to Redux store.<br />

### `store`

Contains redux-toolkit configuration as well slices of 
all entities in the system.<br />

### `utils`

Support components amongst the whole project.<br />

## Development

Before running locally, you have to config `.env.development`
file to set backend endpoint to localhost. Use `.env.production` as a reference to it

In the project directory, you can run:

### `npm install`

Install dependencies for the project.<br />

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Deployment

We use Docker to deploy the app. Follow below steps
to deploy the app on production server.

### 1. Config environment vairable

Edit the `.env.production` of the project with correct
backend endpoints.<br />

### 2. `docker-compose up -d`

This command will pack out application into a docker image.
Then run a fe-creamcats container with that image.

