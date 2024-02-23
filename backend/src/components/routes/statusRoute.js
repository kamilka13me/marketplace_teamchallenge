// statusRoute.js

import express from 'express';

import StatusController from '../controllers/statusController.js';

const router = express.Router();

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

/**
 * @swagger
 * /status/clear/{count}:
 *   get:
 *     summary: Prints backslashes a specified number of times and shows current date
 *     description: This endpoint prints the backslash symbol (`\`) a specified number of times to the console and returns the current date.
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: count
 *         required: true
 *         description: Number of times to print the backslash symbol
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully printed the specified number of backslashes and returned the current date.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Message printed to console 10 times. Current date: 2024-02-20T12:00:00"
 *       400:
 *         description: Invalid count provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid count provided"
 */

router.get('/clear/:count', StatusController.clear);

export default router;
