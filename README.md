# PALETTE PICKER (Backend)
## Mod 4 Paired Project at Turing School of Software & Design
 
## Dev Squad: [Benjamin Firth](https://github.com/benjamin-firth) & [Kayla Wood](https://github.com/kaylaewood)  

![play](https://media.giphy.com/media/XGmBgr8V02DrrqFpYd/giphy.gif)

### [Click here](https://palettepickerapp.herokuapp.com/api/v1/projects) to view the Heroku endpoint.
### [Click here](https://github.com/kaylaewood/colorPickerFrontend) to view the frontend repo for this project.

### ABOUT
This app enables users to find and save color palettes for projects. Users can generate random palettes, lock the colors they like, and then regenerate the colors they don't. Then, users can create projects and assign palettes to projects. Users can also delete projects and palettes.

For this application, we built the backend and frontend from scratch. The frontend was built with React Hooks, Redux, and Sass. The backend was build with Node.js, Express, knex, and postgreSQL. Everything was tested using Jest and Enzyme. Fetch calls are made to our [heroku hosted API](http://palettepickerapp.herokuapp.com/api/v1/projects). This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). This project has a robust testing suite.

### DEV SET UP INSTRUCTIONS
- `git clone` this repo
- `cd` into that directory
- Run `npm install`
- Run `npm start` to start the local server
- Run `npm test` to view testing suite

### FRONTEND TECHNOLOGIES USED
- React Hooks
- Redux
- Fetch API
- Sass
- Jest/Enzyme

### BACKEND TECHNOLOGIES USED
- Node.js
- Express
- Knex
- PostgreSQL
- Jest/Enzyme

## Endpoints  

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all palettes |`/api/v1/palettes`| GET | N/A | `{palettes: [{}, {}, ...]}`  |
| Get specific palette |`/api/v1/palettes/:id`| GET | N/A | `{}` |
| Post a palette |`/api/v1/palettes`| POST | `{ name: <String>, color1: <String>, color2: <String>, color3: <String>, color3: <String>, color4: <String>, color5: <String> }` | `{ id: <Number> }` |
| Delete a palette |`/api/v1//palettes/:id'| DELETE | N/A | |
| Get all projects |`/api/v1/projects`| GET | N/A | `{projects: [{}, {}, ...]}` |
| Get specific project |`/api/v1/projects/:id`| GET | N/A | `{}` |
| Post a project |`/api/v1/projects`| POST | `{ name: <String> }` | `{ id: <Number> }` |
| Delete a project |`/api/v1/projects/:id`| DELETE | N/A | |
| Get all palettes with specific color |`/api/v1/palettes/chooseColors?chosenColor=:colorcode`| GET | No Body, but a query param of chosenColor | `{palettes: [{}, {}, ...]}` |
| Update a project name |`/api/v1/projects/:id`| PATCH | `{ name: <String> }` | `{ id: <Number> }` |

