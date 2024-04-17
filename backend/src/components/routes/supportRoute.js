import express from 'express';

import idToReq from '../../middlewares/chechUserId.js';
import { upload, appendFileNamesToBody } from '../../middlewares/uploadSupport.js';
import supportController from '../controllers/supportController.js';

const supportRoute = express.Router();

/**
 * @swagger
 * /support:
 *   post:
 *     summary: Creates a new support message
 *     tags:
 *        - Support
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 required: true
 *                 description: Topic
 *               content:
 *                 type: string
 *                 required: true
 *                 description: Content
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: images image
 *
 *
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                properties:
 *                    product:
 *                      $ref: '#/components/schemas/Support'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               typevj;yf: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:  Invalid request body
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
supportRoute.post(
  '/',
  upload.array('images'),
  appendFileNamesToBody,
  idToReq(),
  supportController.sendForm,
);

export default supportRoute;
