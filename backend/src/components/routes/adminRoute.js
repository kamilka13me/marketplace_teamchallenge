import express from 'express';
import adminController from '../controllers/adminController.js';

const AdminRoute = express.Router();

/**
 * @swagger
 * /admin/complaints:
 *   get:
 *     summary: Get list of complaints
 *     description: Retrieve a list of complaints with related products, average product rating, responses to comments, and author information. Supports pagination.
 *     tags:
 *       - Complaints
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of complaints to retrieve
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Offset for pagination
 *     responses:
 *       200:
 *         description: Successful retrieval of complaints list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   description: Total number of complaints
 *                   example: 50
 *                 complaints:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Complaint ID
 *                         example: 60c72b2f9b1d4c3a4a4f4c9b
 *                       commentId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Comment ID
 *                             example: 60c72b2f9b1d4c3a4a4f4c9a
 *                           authorId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 description: Author ID
 *                                 example: 60c72b2f9b1d4c3a4a4f4c99
 *                               name:
 *                                 type: string
 *                                 description: Author's name
 *                                 example: John Doe
 *                           productId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 description: Product ID
 *                                 example: 60c72b2f9b1d4c3a4a4f4c98
 *                               name:
 *                                 type: string
 *                                 description: Product name
 *                                 example: Awesome Product
 *                               price:
 *                                 type: number
 *                                 description: Product price
 *                                 example: 100.00
 *                       reason:
 *                         type: integer
 *                         description: Complaint reason
 *                         example: 3
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Complaint creation date
 *                         example: 2021-06-13T12:34:56.789Z
 *                       response:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Response comment ID
 *                             example: 60c72b2f9b1d4c3a4a4f4c9c
 *                           authorId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 description: Response author ID
 *                                 example: 60c72b2f9b1d4c3a4a4f4c97
 *                               name:
 *                                 type: string
 *                                 description: Response author's name
 *                                 example: Jane Doe
 *                           comment:
 *                             type: string
 *                             description: Response text
 *                             example: This is a response to your comment
 *                       product:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Product ID
 *                             example: 60c72b2f9b1d4c3a4a4f4c98
 *                           name:
 *                             type: string
 *                             description: Product name
 *                             example: Awesome Product
 *                           price:
 *                             type: number
 *                             description: Product price
 *                             example: 100.00
 *                           averageRating:
 *                             type: number
 *                             description: Average product rating
 *                             example: 4.5
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error description
 *                   example: Internal server error
 */

AdminRoute.get('/complaints', adminController.getComplaints);

export default AdminRoute;

