const express = require('express');
const cors = require('cors');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Palette Picker App';
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Welcome to Palette Picker!');
});

app.get('/api/v1/palettes', async (request, response) => {
  try {
    const palettes = await database('palettes').select();

    if (palettes.length) {
      return response.status(200).json({ palettes });
    } else {
      return response.send('You don\'t have any palettes yet!')
    }
  } catch (error) {
    response.status(500).json({ error });
    return;
  }
});

app.get('/api/v1/palettes/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const palette = await database('palettes').where('id', id);
    if (palette.length) {
      response.status(200).json(palette[0])
      return;
    } else{
      response.status(404).json({ error: `Could not find palette with the id: ${id}`});
      return;
    };
  } catch (error) {
    response.status(500).json({ error });
    return;
  };
});

app.post('/api/v1/palettes', async (request, response) => {
  const palette = request.body;

  for (let requiredParameter of ['color1', 'color2', 'color3', 'color4', 'color5', 'project_id', 'name']) {
    if (!palette.hasOwnProperty(requiredParameter)) {
      return response.status(422).send({ error: `The expected format is: { project_id: <Integer>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>, name: <String> }. You are missing the ${requiredParameter} property.` });
    };
  };

  try {
    const id = await database('palettes').insert(palette, 'id');
    response.status(201).json({ ...palette, id });
    return;
  } catch (error) {
    response.status(500).json({ error });
    return;
  };
});

app.delete('/api/v1/palettes', async (request, response) => {
  const { id } = request.body;

  if (!id) {
    return response.status(422).json({ error: 'The expected format is: { id: <Number> }. You are missing the id property.'})
  };

  await database('palettes').where('id', id).del();

  try {
    response.status(200).json(id);
    return;
  } catch (error) {
    response.status(500).json({ error });
    return;
  }
});

app.get('/api/v1/projects', async (request, response) => {
  try {
    const projects = await database('projects').select();

    if (projects.length) {
      return response.status(200).json({ projects });
    } else {
      return response.send('You don\'t have any projects yet!')
    }
  } catch (error) {
    response.status(404).send({ error });
    return;
  }
});

app.get('/api/v1/projects/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const project = await database('projects').where('id', id);

    if(project.length) {
      response.status(200).json(project);
      return;
    } else {
      response.status(404).json({ error: `A project with the id of ${id} does not exist.`});
      return;
    }
  } catch (error) {
    response.status(500).json({ error });
    return;
  }
});

app.post('/api/v1/projects', async (request, response) => {
  const project = request.body;

  if (!project.name) {
    return response.status(422).json({
      error: 'You are missing a name property for this project'
    });
  };

  const name = await database('projects').where('name', project.name)

  if (name.length >= 1) {
    return response.status(400).json({
      error: `A project with the name ${project.name} already exists.`
    });
  };

  try {
    const id = await database('projects').insert(project, 'id');
    response.status(201).json({ ...project, id: id[0] });
  } catch (error) {
    response.status(500).json({ error });
    return;
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
  return;
});

module.exports = app;
