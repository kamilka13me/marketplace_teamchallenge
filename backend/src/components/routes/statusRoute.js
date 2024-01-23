// statusRoute.js

import express from 'express';

import StatusController from '../controllers/statusController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Status
 *     description: Operations related to server status
 */

/**
 * @openapi
 * /status/ping:
 *
 *   get:
 *     summary: Ping server
 *     description: return server status
 *     tags: [Status]
 *     responses:
 *       '200':
 *         description: successful status
 *         content:
 *           application/json:
 *             example:
 *               message: server online
 */
// ping server route
router.get('/ping', StatusController.ping);

/**
 * @openapi
 * /status/info:
 *   post:
 *     summary: Get server info
 *     description: return server info
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: server online
 *         content:
 *           application/json:
 *             example:
 *               message: "server online"
 *               serverTime: "2024-01-21T21:20:08.786Z"
 */
router.post('/info', StatusController.info);

export default router;
