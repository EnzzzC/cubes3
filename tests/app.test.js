const request = require('supertest');
const app = require('../index');

let server;

afterAll(done => {
  server.close(() => {
    done();
  });
});

describe('GET /', () => {
  it('devrait retourner un message de bienvenue', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Hello World!');
  });
});

describe('POST /add', () => {
  it('devrait retourner la somme de deux nombres', async () => {
    const res = await request(app).post('/add').send({ a: 5, b: 7 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', 12);
  });

  it('devrait retourner une erreur pour une entrée invalide', async () => {
    const res = await request(app).post('/add').send({ a: '5', b: 7 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      'error',
      'Invalid input. a and b must be numbers.',
    );
  });
});
