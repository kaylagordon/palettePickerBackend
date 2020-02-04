import "@babel/polyfill";
import request from 'supertest';
import app from './app';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('Server', () => {

  beforeEach(async () => {
    await database.seed.run();
  })
  //before each block is run, we are going to reseed our data so it remains the original array of 3 objects (posts won't stay)

  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    });
  });

describe('GET /api/v1/students', () => {
  it('should return a status code of 200 and all students', async () => {
    // set up
    const expectedStudents = await database('students').select();

    //execution
    const response = await request(app).get('/api/v1/students');
    //super test
    //app is an instance of an HTTP server
    const students = response.body;

    //assertion
    expect(response.status).toBe(200);
    expect(students).toEqual(expectedStudents);
  })
})

describe('GET /api/v1/students/:id', () => {
  it('should return a code of 200 and a single student if the student exists', async () => {
    //set up
    const expectedStudent = await database('students').first();
    const { id } = expectedStudent;
    //created a valid id

    //execution
    const response = await request(app).get(`/api/v1/students/${id}`);
    const result = response.body[0];

    //assertion
    expect(response.status).toBe(200);
    expect(result).toEqual(expectedStudent);
  })

  it('should return a code of 404 if the student does not exist', async () => {
    //set up
    const invalidId = -400;

    //execution
    const response = await request(app).get(`/api/v1/students/${invalidId}`);

    //assertion
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual(`A student with the id of ${invalidId} does not exist.`)
  })
})

describe('POST /api/v1/students', () => {
  it('should post a new student to the database', async () => {
    // set up
    const newStudent = {
      lastname: 'Pants',
      program: 'FE'
    }

    // execution
    const response = await request(app).post('/api/v1/students').send(newStudent);
    const students = await database('students').where('id', response.body.id[0]);

    const student = students[0];

    // assertion
    expect(response.status).toBe(201);
    expect(student.lastname).toEqual(newStudent.lastname);
  })
})

});




// test that we PUT an existing student in the DB
// test that we DELETE an existing student from the DB
