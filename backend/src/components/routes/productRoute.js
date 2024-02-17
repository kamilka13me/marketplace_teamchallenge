import express from 'express';

import productController from '../controllers/productController.js';

const productRoute = express.Router();
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Creates a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: Product name
 *               description:
 *                 type: string
 *                 required: true
 *                 description: Product description
 *               price:
 *                 type: number
 *                 required: true
 *                 format: double
 *                 description: Product price
 *               category:
 *                 type: string
 *                 required: true
 *                 description: Product category
 *               quantity:
 *                 type: number
 *                 required: true
 *                 format: int64
 *                 description: Quantity 
 *               images:
 *                 type: string
 *                 description: URLs of product images separated by commas
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: Product name
 *               description:
 *                 type: string
 *                 required: true
 *                 description: Product description
 *               price:
 *                 type: number
 *                 required: true
 *                 format: double
 *                 description: Product price
 *               category:
 *                 type: string
 *                 required: true
 *                 description: Product category
 *               quantity:
 *                 type: number
 *                 required: true
 *                 format: int64
 *                 description: Quantity 
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Product image

 * 
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
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
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

productRoute.get('/', productController.default);

export default productRoute;
