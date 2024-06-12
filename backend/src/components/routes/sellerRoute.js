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

sellerRoute.post('/', sellerController.createSeller);

/**
 * @swagger
 * /seller:
 *   get:
 *     summary: Get all users with role "seller"
 *     description: Retrieve a list of all users who have the role "seller".
 *     tags:
 *       - Seller
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
 *         description: An array of users information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   description: Array of user objects.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: User ID.
 *                         example: "66425e06cba57aa563ffd39c"
 *                       username:
 *                         type: string
 *                         description: company name.
 *                         example: "companyName"
 *                       email:
 *                         type: string
 *                         description: User's email address.
 *                         example: "example@gmail.com"
 *                       role:
 *                         type: string
 *                         description: User's role.
 *                         example: "seller"
 *                       isAccountConfirm:
 *                         type: boolean
 *                         description: Indicates whether the user's account is confirmed or not.
 *                         example: true
 *       404:
 *         description: Role "seller" not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role "seller" not found.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

sellerRoute.get('/', sellerController.getSellers);
/**
 * @swagger
 * /seller/products:
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
sellerRoute.get('/products', idToReq(), sellerController.getAllProducts);

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
/**
 * @swagger
 * /seller/info:
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
 *         description: Seller updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seller updated successfully"
 *                 seller:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "663e25c749d8ef9959fb0ab4"
 *                     sellerId:
 *                       type: string
 *                       example: "663e25c749d8ef9959fb0ab2"
 *                     legalName:
 *                       type: string
 *                       example: "Example Inc."
 *                     legalAddress:
 *                       type: string
 *                       example: "123 Example St."
 *                     city:
 *                       type: string
 *                       example: "Example City"
 *                     cityIndex:
 *                       type: string
 *                       example: "12345"
 *                     communication:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           messenger:
 *                             type: string
 *                             example: "Whatsapp"
 *                           phone:
 *                             type: string
 *                             example: "+1234567890"
 *                     condition:
 *                       type: boolean
 *                       example: true
 *                     contacts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           phone:
 *                             type: string
 *                             example: "+1234567890"
 *                           person:
 *                             type: string
 *                             example: "John Doe"
 *                     descriptCompany:
 *                       type: string
 *                       example: "This is a description of the company."
 *                     emailAdvertisement:
 *                       type: boolean
 *                       example: true
 *                     emailAdvice:
 *                       type: boolean
 *                       example: true
 *                     emailMessage:
 *                       type: boolean
 *                       example: true
 *                     generalCommunication:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           messenger:
 *                             type: string
 *                             example: "Telegram"
 *                           phone:
 *                             type: string
 *                             example: "+1234567890"
 *                     generalName:
 *                       type: string
 *                       example: "General Store"
 *                     idStateRegister:
 *                       type: string
 *                       example: "123456789"
 *                     identificNumber:
 *                       type: string
 *                       example: "987654321"
 *                     tax:
 *                       type: boolean
 *                       example: true
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
sellerRoute.get('/info', sellerController.getSellerInfo);
/**
 * @swagger
 * /seller/updateSellerInfo:
 *   post:
 *     summary: Updates seller information based on the provided userId
 *     description: This endpoint updates existing seller information. It updates only the fields provided in the request body for the identified seller.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Seller
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               legalName:
 *                 type: string
 *                 description: Legal name of the seller or company
 *               legalAddress:
 *                 type: string
 *                 description: Legal address of the seller or company
 *               city:
 *                 type: string
 *                 description: City where the seller or company is located
 *               cityIndex:
 *                 type: string
 *                 description: Postal code of the city
 *               communication:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     messenger:
 *                       type: string
 *                     phone:
 *                       type: string
 *               condition:
 *                 type: boolean
 *                 description: Terms and conditions related information
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     phone:
 *                       type: string
 *                     person:
 *                       type: string
 *               descriptCompany:
 *                 type: string
 *                 description: Description of the company
 *               emailAdvertisement:
 *                 type: boolean
 *                 description: Option for receiving advertisements via email
 *               emailAdvice:
 *                 type: boolean
 *                 description: Option for receiving advice via email
 *               emailMessage:
 *                 type: boolean
 *                 description: Option for receiving messages via email
 *               generalCommunication:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     messenger:
 *                       type: string
 *                     phone:
 *                       type: string
 *               generalName:
 *                 type: string
 *                 description: General name, potentially a nickname or a sub-brand
 *               idStateRegister:
 *                 type: string
 *                 description: Registration ID in the state register
 *               identificNumber:
 *                 type: string
 *                 description: Identification number of the seller or company
 *               tax:
 *                 type: boolean
 *                 description: Tax status or tax option indicator
 *     responses:
 *       201:
 *         description: Seller information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Seller'
 *       500:
 *         description: Bad request, data provided cannot be processed
 */

sellerRoute.post('/updateSellerInfo', idToReq(), sellerController.updateSellerInfo);

/**
 * @swagger
 * /seller/{id}:
 *   put:
 *     summary: Update subscribe status by ID
 *     tags: [Seller]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the seller to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   subscribe:
 *                     type: string
 *                     description: subscribe of the seller
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

sellerRoute.put('/:id', sellerController.updateSubscribe);

export default sellerRoute;
