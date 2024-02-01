const supertest = require("supertest");
const server = require('../server');

describe('StatusController', () => {
    beforeAll(async () => {
        // Додайте затримку перед початком тестів
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
