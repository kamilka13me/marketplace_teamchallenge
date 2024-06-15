import express from 'express';

import adminController from '../controllers/adminController.js';

const AdminRoute = express.Router();

/**
 * @swagger
 * /admin/complaints:
 *   get:
 *     summary: Get a list of complaints
 *     description: Returns a list of complaints with details about the comment, response, and product.
 *     tags: [Complaints]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: search
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
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: integer
 *           enum: [1, -1]
 *           default: 1
 *         description: Sorting direction (1 for ascending, -1 for descending)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering
 *     responses:
 *       200:
 *         description: Successful response, returns a list of complaints
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   description: Total number of complaints
 *                 complaints:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID of the complaint
 *                       reason:
 *                         type: integer
 *                         description: Reason for the complaint
 *                       createdAt:
 *                         type: string
 *                         description: date for the complaint
 *                       comment:
 *                         type: object
 *                         description: Details of the comment
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: ID of the comment
 *                           username:
 *                             type: string
 *                             description: Username of the commenter
 *                           email:
 *                             type: string
 *                             description: Email of the commenter
 *                           comment:
 *                             type: string
 *                             description: Text of the comment
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: Images attached to the comment
 *                           rating:
 *                             type: number
 *                             description: Rating of the comment
 *                       response:
 *                         type: object
 *                         description: Details of the response to the comment
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: ID of the response
 *                           username:
 *                             type: string
 *                             description: Username of the responder
 *                           email:
 *                             type: string
 *                             description: Email of the responder
 *                           comment:
 *                             type: string
 *                             description: Text of the response
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: Images attached to the response
 *                       product:
 *                         type: object
 *                         description: Details of the product
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: ID of the product
 *                           name:
 *                             type: string
 *                             description: Name of the product
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: Images of the product
 *       500:
 *         description: Internal server error
 */

AdminRoute.get('/complaints', adminController.getComplaints);
/**
 * @swagger
 * /admin/complaints/{id}:
 *   delete:
 *     summary: Delete a complaint by ID
 *     tags: [Complaints]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Complaint ID
 *     responses:
 *       200:
 *         description: Complaint deleted successfully
 *       404:
 *         description: Complaint not found
 *       500:
 *         description: Internal server error
 */
AdminRoute.delete('/complaints/:id', adminController.deleteCoplaints);

/**
 * @swagger
 * /admin/complaints/{id}/with-comment-rating:
 *   delete:
 *     summary: Delete a complaint by ID along with the associated comment and rating
 *     tags: [Complaints]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Complaint ID
 *     responses:
 *       200:
 *         description: Complaint, comment, and rating deleted successfully
 *       404:
 *         description: Complaint not found
 *       500:
 *         description: Internal server error
 */
AdminRoute.delete('/complaints/:id/with-comment-rating', adminController.deleteCoplaints);

/**
 * @swagger
 * /admin/statistics:
 *   get:
 *     summary: Get statistical data
 *     description: Retrieve statistical data including new users and sellers per day, open contacts, and visits.
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for filtering data (YYYY-MM-DD).
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering data (YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: Successful response with statistical data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newUsersPerDay:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: integer
 *                       date:
 *                         type: string
 *                         format: date
 *                 newSalersPerDay:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       count:
 *                         type: integer
 *                       date:
 *                         type: string
 *                         format: date
 *                 openContactsCurrentMonth:
 *                   type: integer
 *                 openContactsPreviousMonth:
 *                   type: integer
 *                 visitsCurrentMonth:
 *                   type: integer
 *                 visitsPreviousMonth:
 *                   type: integer
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

AdminRoute.get('/statistics', adminController.getStatistics);
export default AdminRoute;
