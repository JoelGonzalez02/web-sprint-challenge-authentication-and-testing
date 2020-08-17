const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('jokesRouter', () => {
  describe('get /', () => {
    let res = {};

    beforeAll(async () => {
      await db('users').truncate();

      await request(server).post('/api/auth/register').send({ username: 'Lebron James', password: 'TheKing23'});

      const user = await request(server).post('/api/auth/login').send({username: 'Lebron James',password: 'TheKing23'});

      token = user.body.token;

      res = await request(server).get('/api/jokes').set('Authorization', `Bearer ${token}`);
    });

    it('returns a status of 200', async () => {
      expect(res.status).toBe(200);
    });

    it('uses a type of json', () => {
      expect(res.type).toBe('application/json');
    });
  });
});