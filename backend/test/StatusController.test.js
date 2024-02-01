import supertest from 'supertest';

import server from '../server';

describe('StatusController', () => {
  beforeAll(async () => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  describe('ping', () => {
    test('GET /api/status/ping повертає статус 200 та "server online"', async () => {
      const response = await supertest(server).get('/api/status/ping');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('server online');
    });
  });
});
