# PALETTE PICKER (Backend)

### Mod 4 Paired Project
## Dev SQUAD
[Benjamin Firth](https://github.com/benjamin-firth)  
[Kayla Wood](https://github.com/kaylaewood)  

This is the back end for our color palette application.  It provides a RESTful API server with endpoints for GET, POST, DELETE, PUT, as well as a custom endpooint for a filtered GET.

This is used by our front-end application [colorPicker](https://github.com/kaylaewood/colorPickerFrontend).

## Setup
- Clone this repo and run `npm install` in your terminal
- Run the server by entering `nodemon server.js`

The server will run on `http://localhost:3001` locally, and `http://palettepickerapp.herokuapp.com/api/v1` on Heroku.

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

