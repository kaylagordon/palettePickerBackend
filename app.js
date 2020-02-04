import express from 'express';
import cors from 'cors';
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Test Server';
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('We\'re going to test all the routes!');
});
