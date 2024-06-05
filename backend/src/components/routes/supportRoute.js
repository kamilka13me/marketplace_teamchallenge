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

/**
 * @swagger
 * /support/complaint:
 *   post:
 *     summary: Creates a new complaint
 *     tags:
 *        - Support
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *                 required: true
 *                 description: commentId
 *               content:
 *                 type: string
 *                 required: true
 *                 description: Content
 *               reason:
 *                 type: string
 *                 required: true
 *                 description: Content
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
supportRoute.post('/complaint', supportController.createComplaint);

/**
 * @swagger
 * /support:
 *   get:
 *     summary: Get support messages with optional filtering and pagination
 *     tags: [Support]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for filtering messages (inclusive)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for filtering messages (inclusive)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, consider, work, closed]
 *         description: Status for filtering messages
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for partial match on user fields (username or email)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of messages to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of messages to skip
 *     responses:
 *       200:
 *         description: List of support messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                     description: Last 12 characters of the user ID
 *                   userMail:
 *                     type: string
 *                     description: Email of the user
 *                   topic:
 *                     type: string
 *                     description: Topic of the support message
 *                   content:
 *                     type: string
 *                     description: Content of the support message
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of image URLs
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time when the message was created
 *                   status:
 *                     type: string
 *                     enum: [new, consider, work, closed]
 *                     description: Status of the support message
 *                   _id:
 *                     type: string
 *                     description: Last 12 characters of the support message ID
 *       500:
 *         description: Server error
 */

supportRoute.get('/', supportController.getSupport);

/**
 * @swagger
 * /support/{id}:
 *   put:
 *     summary: Update support status by ID
 *     tags: [Support]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the support to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   status:
 *                     type: string
 *                     enum: [new, consider, work, closed]
 *                     description: Status of the support message
 *     responses:
 *       200:
 *         description: Support status updated successfully
 *       400:
 *         description: Invalid status provided
 *       404:
 *         description: Support not found
 *       500:
 *         description: Server error
 */

supportRoute.put('/:id', supportController.updateStatus);

export default supportRoute;
