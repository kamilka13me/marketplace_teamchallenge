import express from 'express';

import idToReq from '../../middlewares/chechUserId.js';
import sellerController from '../controllers/sellerController.js';

const sellerRoute = express.Router();

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
