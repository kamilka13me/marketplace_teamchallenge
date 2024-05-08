import express from 'express';

import idToReq from '../../middlewares/chechUserId.js';
import sellerController from '../controllers/sellerController.js';

const sellerRoute = express.Router();
/**
 * @swagger
 * /seller:
 *   post:
 *     summary: Create a new seller
 *     description: Registers a new seller with given information, checks required fields and validates the password.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Seller
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the seller.
 *               surname:
 *                 type: string
 *                 description: Surname of the seller.
 *               email:
 *                 type: string
 *                 description: Email of the seller, must be unique.
 *               password:
 *                 type: string
 *                 description: Password for the seller account, must meet complexity requirements.
 *               info:
 *                 type: object
 *                 description: Additional browser information for the seller.
 *               legalName:
 *                 type: string
 *                 description: Legal name of the seller company.
 *               legalAddress:
 *                 type: string
 *                 description: Legal address of the seller company.
 *               city:
 *                 type: string
 *                 description: City where the seller company is located.
 *               cityIndex:
 *                 type: string
 *                 description: Postal code of the city.
 *               communication:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contact'
 *                 description: Communication methods available.
 *               condition:
 *                 type: boolean
 *                 description: Any specific conditions or terms.
 *               contacts:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ContactDetail'
 *                 description: Contact details of people in the company.
 *               descriptCompany:
 *                 type: string
 *                 description: A brief description of the company.
 *               emailAdvertisement:
 *                 type: boolean
 *                 description: Email for advertisement purposes.
 *               emailAdvice:
 *                 type: boolean
 *                 description: Email for advice.
 *               emailMessage:
 *                 type: boolean
 *                 description: General email for messages.
 *               generalCommunication:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contact'
 *                 description: General communication methods.
 *               generalName:
 *                 type: string
 *                 description: General name of the seller or the company.
 *               idStateRegister:
 *                 type: string
 *                 description: State registration ID.
 *               identificNumber:
 *                 type: string
 *                 description: Identification number of the seller.
 *               tax:
 *                 type: boolean
 *                 description: Tax information.
 *     responses:
 *       201:
 *         description: Seller created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                 seller:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                   description: Bearer token for accessing the API.
 *       400:
 *         description: Input validation failed or missing mandatory fields.
 *       409:
 *         description: Email already exists.
 *       500:
 *         description: Internal server error.
 */

sellerRoute.post('/', idToReq(), sellerController.createSeller);
/**
 * @swagger
 * /seller:
 *   get:
 *     summary: Get a list of seller All products
 *     description: Get a list of all products according to filters and sorting.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Seller
 *
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limit number of products returned.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Offset in products list.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the product to search for.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by product category or product Id.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: '_id'
 *         description: Field to sort by.
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: integer
 *           enum: [1, -1]
 *           default: 1
 *         description: Sort direction, where 1 is ascending and -1 is descending.
 *       - in: query
 *         name: discount
 *         schema:
 *           type: integer
 *           default: 0
 *         description: discount filter. if 0 off.
 *       - in: query
 *         name: quantity
 *         schema:
 *           type: integer
 *           default: 1
 *         description: quantity filter. if 0 off.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
sellerRoute.get('/', idToReq(), sellerController.getAllProducts);

/**
 * @swagger
 * /seller/contacts:
 *   get:
 *     summary: Get a list of seller contacts
 *     description: Get a list contacts
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Seller
 *
 *     parameters:
 *       - in: query
 *         name: sellerId
 *         schema:
 *           type: string
 *         description: seller id.
 *     responses:
 *       200:
 *         description: A list of contacts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   telegram:
 *                     type: string
 *                     example: '379809808'
 *                   viber:
 *                     type: string
 *                     example: '379809808'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
sellerRoute.get('/contacts', idToReq(), sellerController.getContacts);

export default sellerRoute;
