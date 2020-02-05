const express = require('express');
const cors = require('cors');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Test Server';
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Welcome to Palette Picker!');
});

app.get('/api/v1/projects', async (request, response) => {
  try {
    const projects = await database('projects').select();
    response.status(200).json(projects);
  } catch (error) {
    response.status(404).send({ error })
  }
});

app.get('/api/v1/projects/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const project = await database('projects').where('id', id);

    if(project.length) {
      response.status(200).json(project);
    } else {
      response.status(404).json({ error: `A project with the id of ${id} does not exist.`})
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.post('/api/v1/projects/', async (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['name']) {
    if (!project.hasOwnProperty(requiredParameter)) {
      return response.status(422).send({ error: `The expected format is: { name: <String> }. You are missing the ${requiredParameter} property.` });
    };
  };

  try {
    const id = await database('projects').insert(project, 'id');
    response.status(201).json({ ...project, id });
  } catch (error) {
    response.status(500).json({ error });
  };
});

app.delete('/api/v1/projects', (request, response) => {
  const { id } = request.body;

  if (!id) {
    return response.status(422).json({ error: 'The expected format is: { id: <Number> }. You are missing the id property.'})
  }

  database('projects')
    .where('id', parseInt(id))
    .del()
    .then(response.status(200).json(id))
    .catch(error => response.status(500).json({ error }));
});


module.exports = app;
