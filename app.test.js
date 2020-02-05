import "@babel/polyfill";
import request from 'supertest';
import app from './app';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('Server', () => {

  beforeEach(async () => {
    await database.seed.run();
  });

  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    });
  });

  describe('GET /api/v1/projects', () => {
    it('should return a status code of 200 and all projects', async () => {
      const expectedProjects = await database('projects').select();
      const response = await request(app).get('/api/v1/projects');
      const projects = response.body;

      expect(response.status).toBe(200);
      expect(projects[0].id).toEqual(expectedProjects[0].id);
    });
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should return a code of 200 and a single project if the project exists', async () => {
      const expectedProject = await database('projects').first();
      const { id } = expectedProject;
      const response = await request(app).get(`/api/v1/projects/${id}`);
      const result = response.body[0];

      expect(response.status).toBe(200);
      expect(result.id).toEqual(expectedProject.id);
    });

    it('should return a code of 404 if the project does not exist', async () => {
      const invalidId = -100;
      const response = await request(app).get(`/api/v1/projects/${invalidId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`A project with the id of ${invalidId} does not exist.`)
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should post a new project to the database', async () => {
      const newProject = { name: 'Pants' };
      const response = await request(app).post('/api/v1/projects').send(newProject);
      const projects = await database('projects').where('id', response.body.id[0]);
      const project = projects[0];

      expect(response.status).toBe(201);
      expect(project.name).toEqual(newProject.name);
    });

    it('should return a code of 422 if the payload is incorrect', async () => {
      const newProject = { title: 'Pants' };
      const response = await request(app).post('/api/v1/projects').send(newProject);

      expect(response.status).toBe(422);
      expect(response.body.error).toEqual('The expected format is: { name: <String> }. You are missing the name property.')
    });
  });

  describe('DELETE /api/v1/projects', () => {
    it('should delete a project from the database', async () => {
      const expectedProject = await database('projects').first();
      const { id } = expectedProject;
      const response = await request(app).delete('/api/v1/projects').send({ id });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(id);
    });

    it('should return a code of 422 if the payload is incorrect', async () => {
      const response = await request(app).delete('/api/v1/projects').send({});

      expect(response.status).toBe(422);
      expect(response.body.error).toEqual('The expected format is: { id: <Number> }. You are missing the id property.')
    });
  });

  describe('GET endpoints for palettes', () => {
    describe('GET endpoint for all palettes', () => {
      it('should return a 200 status and all of the palettes', async () => {
        const expected = await database('palettes').select();
        const response = await request(app).get('/api/v1/palettes');
        const palettes = response.body;
        
        expect(response.status).toBe(200);
        expect(palettes.palettes[0].id).toEqual(expected[0].id);
      });
    });

    describe('GET endpoint for individual palette', () => {
      it('should return a 200 status and the specific palette chosen', async () => {
        const expected = await database('palettes').first();
        const { id } = expected;
        const response = await request(app).get(`/api/v1/palettes/${id}`);
        const result = response.body;
  
        expect(response.status).toBe(200);
        expect(result.id).toEqual(id);
      });
  
      it('should return a code of 404 if the project does not exist', async () => {
        const invalidId = -100;
        const response = await request(app).get(`/api/v1/palettes/${invalidId}`);
  
        expect(response.status).toBe(404);
        expect(response.body.error).toEqual(`Could not find palette with the id: -100`)
      });
    });
  });

  describe('POST /api/v1/palettes', () => {
    it('should post a new palette to the database', async () => {
      const expectedProject = await database('projects').first();
      const { id } = expectedProject;
      const newpalette = {
        project_id: id,
        color1: '1221b',
        color2: '21122b',
        color3: '34433b',
        color4: '43344b',
        color5: '56655b'
      };
      const response = await request(app).post('/api/v1/palettes').send(newpalette);
      const palettes = await database('palettes').where('color1', response.body.color1);

      expect(response.status).toBe(201);
      expect(palettes[0].color1).toEqual(newpalette.color1);
    });

    it('should return a code of 422 if the payload is incorrect', async () => {
      const newpalette = {
        color1: '1221b',
        color2: '21122b',
        color3: '34433b',
        color4: '43344b',
        color5: '56655b',
      };
      const response = await request(app).post('/api/v1/palettes').send(newpalette);

      expect(response.status).toBe(422);
      expect(response.body.error).toEqual('The expected format is: { project_id: <Integer> }. You are missing the project_id property.')
    });
  });

  describe('DELETE /api/v1/palettes', () => {
    it('should delete a palette from the database', async () => {
      const expectedPallete = await database('palettes').first();
      const { id } = expectedPallete;
      const response = await request(app).delete('/api/v1/palettes').send({ id });
      console.log('yay girl', response.status);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(id);
    });

    it.skip('should return a code of 422 if the payload is incorrect', async () => {
      const response = await request(app).delete('/api/v1/palettes').send({});

      expect(response.status).toBe(422);
      expect(response.body.error).toEqual('The expected format is: { id: <Number> }. You are missing the id property.')
    });
  });
});
