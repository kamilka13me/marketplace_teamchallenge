import express from 'express';

import idToReq from '../../middlewares/chechUserId.js';
import FeedbackController from '../controllers/FeedbackController.js';

const FeedbackRoute = express.Router();
/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create a new rating
 *     description: Adds a new rating to the database.
 *     tags: [Feedback]
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               sellerId:
 *                 type: string
 *                 description: The id of the seller to whom the rating is being given
 *               productId:
 *                 type: string
 *                 description: The id of the product being rated
 *               rating:
 *                 type: number
 *                 description: The rating score
 *             example:
 *               sellerId: "1234567890abcdef12345679"
 *               productId: "1234567890abcdef12345670"
 *               rating: 4
 *     responses:
 *       201:
 *         description: Rating created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       400:
 *         description: Error in request data
 */

FeedbackRoute.post('/', idToReq(), FeedbackController.createRating);

/**
 * @swagger
 * /feedback/seller:
 *   get:
 *     summary: Retrieve counts of ratings grouped by rating value for both current and previous periods
 *     description: Fetches counts of ratings for a specific seller, optionally filtered by a date range, and aggregates them by rating value for both current and previous periods.
 *     tags:
 *       - Ratings
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sellerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ObjectId of the seller
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering ratings (inclusive). If not provided, includes all ratings up to the endDate.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering ratings (inclusive).
 *     responses:
 *       200:
 *         description: A successful response with counts of ratings grouped by rating values for both current and previous periods
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 current:
 *                   type: object
 *                   description: Counts of ratings for the current period
 *                   additionalProperties:
 *                     type: integer
 *                     description: The count of ratings for the rating value
 *                 previous:
 *                   type: object
 *                   description: Counts of ratings for the previous period
 *                   additionalProperties:
 *                     type: integer
 *                     description: The count of ratings for the rating value
 *             example:
 *               current:
 *                 "5": 10
 *                 "4": 7
 *                 "3": 3
 *                 "2": 1
 *                 "1": 0
 *               previous:
 *                 "5": 5
 *                 "4": 3
 *                 "3": 2
 *                 "2": 0
 *                 "1": 1
 *       400:
 *         description: Invalid input data or error in query parameters
 *       500:
 *         description: Server error
 */

FeedbackRoute.get('/seller', idToReq(), FeedbackController.getSellerRating);

/**
 * @swagger
 * /feedback/product:
 *   get:
 *     summary: Retrieve counts of ratings grouped by rating value for both current and previous periods
 *     description: Fetches counts of ratings for a specific seller, optionally filtered by a date range, and aggregates them by rating value for both current and previous periods.
 *     tags:
 *       - Ratings
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering ratings (inclusive). If not provided, includes all ratings up to the endDate.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering ratings (inclusive).
 *     responses:
 *       200:
 *         description: A successful response with counts of ratings grouped by rating values for both current and previous periods
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 current:
 *                   type: object
 *                   description: Counts of ratings for the current period
 *                   additionalProperties:
 *                     type: integer
 *                     description: The count of ratings for the rating value
 *                 previous:
 *                   type: object
 *                   description: Counts of ratings for the previous period
 *                   additionalProperties:
 *                     type: integer
 *                     description: The count of ratings for the rating value
 *             example:
 *               current:
 *                 "5": 10
 *                 "4": 7
 *                 "3": 3
 *                 "2": 1
 *                 "1": 0
 *               previous:
 *                 "5": 5
 *                 "4": 3
 *                 "3": 2
 *                 "2": 0
 *                 "1": 1
 *       400:
 *         description: Invalid input data or error in query parameters
 *       500:
 *         description: Server error
 */

FeedbackRoute.get('/product', idToReq(), FeedbackController.getProductRating);

/**
 * @swagger
 * /feedback/comments:
 *   post:
 *     summary: Creates a new comment and associated rating
 *     description: Creates a new comment for a product or seller and simultaneously creates a rating. This endpoint also supports nested commenting by providing a parent comment ID.
 *     tags: [Comments]
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               sellerId:
 *                 type: string
 *                 description: The ID of the seller to whom the comment is directed (optional).
 *               productId:
 *                 type: string
 *                 description: The ID of the product to which the comment is related (optional).
 *               rating:
 *                 type: number
 *                 description: Numerical rating associated with the comment.
 *               comment:
 *                 type: string
 *                 description: The content of the comment.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of image URLs associated with the comment (optional).
 *               parentId:
 *                 type: string
 *                 description: The ID of the parent comment if this is a reply to another comment (optional).
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the comment
 *         authorId:
 *           type: string
 *           description: The ID of the user who authored the comment
 *         sellerId:
 *           type: string
 *           description: The ID of the seller related to the comment
 *         productId:
 *           type: string
 *           description: The ID of the product related to the comment
 *         ratingId:
 *           type: string
 *           description: The ID of the rating associated with this comment
 *         parentId:
 *           type: string
 *           description: The ID of the parent comment, if this is a nested comment
 *         comment:
 *           type: string
 *           description: The content of the comment
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of images associated with the comment
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The creation date of the comment
 */

FeedbackRoute.post('/comments', idToReq(), FeedbackController.createComment);

/**
 * @swagger
 * /feedback/comments:
 *   get:
 *     summary: Retrieve a list of comments for a specific seller filtered by date with pagination.
 *     description: Retrieve a list of comments related to a specified seller ID. Can also filter by start and end dates. Pagination is handled through limit and offset.
 *     tags: [Comments]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date to filter comments from.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date to filter comments up to.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of comments to return per request.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of comments to skip before starting to return the records.
 *     responses:
 *       200:
 *         description: A list of comments with total comment count.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalComments:
 *                   type: integer
 *                   description: Total number of comments for the specified seller.
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 limit:
 *                   type: integer
 *                   description: Number of comments returned per request.
 *                 offset:
 *                   type: integer
 *                   description: Number of comments skipped.
 *       400:
 *         description: Missing or invalid parameters.
 *       500:
 *         description: Server error.
 */

FeedbackRoute.get('/comments', idToReq(), FeedbackController.getComments);

/**
 * @swagger
 * /feedback/comments/product:
 *   get:
 *     summary: Retrieve a list of comments for a specific seller filtered by date with pagination.
 *     description: Retrieve a list of comments related to a specified seller ID. Can also filter by start and end dates. Pagination is handled through limit and offset.
 *     tags: [Comments]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: The product Id.
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date to filter comments from.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date to filter comments up to.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of comments to return per request.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of comments to skip before starting to return the records.
 *     responses:
 *       200:
 *         description: A list of comments with total comment count.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalComments:
 *                   type: integer
 *                   description: Total number of comments for the specified seller.
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 limit:
 *                   type: integer
 *                   description: Number of comments returned per request.
 *                 offset:
 *                   type: integer
 *                   description: Number of comments skipped.
 *       400:
 *         description: Missing or invalid parameters.
 *       500:
 *         description: Server error.
 */

FeedbackRoute.get('/comments/product', FeedbackController.getCommentsProducts);

export default FeedbackRoute;
