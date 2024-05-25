import express from 'express';

import idToReq from '../../middlewares/chechUserId.js';
import openedCounter from '../../middlewares/openedCounter.js';
import { appendFileNamesToBody, upload } from '../../middlewares/uploadProducts.js';
import productController from '../controllers/productController.js';

const productRoute = express.Router();
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Creates a new product
 *     tags:
 *        - Products
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
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
 *               brand:
 *                 type: string
 *                 description: Product brand
 *               condition:
 *                 type: string
 *                 description: Product condition
 *               status:
 *                 type: string
 *                 description: Product status
 *               price:
 *                 type: number
 *                 required: true
 *                 format: double
 *                 description: Product price
 *               discount:
 *                 type: number
 *                 required: true
 *                 format: int
 *                 description: Product price
 *               specifications:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     specification:
 *                       type: string
 *                       example: "Processor"
 *                     specificationDescription:
 *                       type: string
 *                       example: "Intel Core i7"
 *               discountStart:
 *                 type: string
 *                 format: date-time
 *                 description: Start date of the discount period yy,mm,dd
 *               discountEnd:
 *                 type: string
 *                 format: date-time
 *                 description: End date of the discount period yy,mm,dd
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
 *
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                properties:
 *                    product:
 *                      $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:  Invalid request body
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

productRoute.post(
  '/',

  upload.array('images'),
  appendFileNamesToBody,
  idToReq(),
  productController.createProduct,
);
/**
 * @swagger
 * /products/{id}:
 *   post:
 *     summary: Updates a product by id
 *     tags:
 *        - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
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
 *               brand:
 *                 type: string
 *                 description: Product brand
 *               condition:
 *                 type: string
 *                 description: Product condition
 *               status:
 *                 type: string
 *                 description: Product status
 *               price:
 *                 type: number
 *                 required: true
 *                 format: double
 *                 description: Product price
 *               discount:
 *                 type: number
 *                 required: true
 *                 format: int
 *                 description: Product price
 *               specifications:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     specification:
 *                       type: string
 *                       example: "Processor"
 *                     specificationDescription:
 *                       type: string
 *                       example: "Intel Core i7"
 *               discountStart:
 *                 type: string
 *                 format: date-time
 *                 description: Start date of the discount period yy,mm,dd
 *               discountEnd:
 *                 type: string
 *                 format: date-time
 *                 description: End date of the discount period yy,mm,dd
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
 *
 *     responses:
 *       200:
 *         description: Updated a product by ID
 *         content:
 *           application/json:
 *             schema:
 *                properties:
 *                    product:
 *                      $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:  Invalid request body
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

productRoute.put(
  '/:id',

  upload.array('images'),
  appendFileNamesToBody,
  idToReq(),
  productController.updateProduct,
);
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ObjectId format
 *         content:
 *           application/json:
 *             schema:
 *                example:
 *                   "message": "Invalid ObjectId format"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *                example:
 *                  message: Product not found
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

productRoute.get('/:id', openedCounter(), productController.getOneProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products
 *     description: Get a list of all products according to filters and sorting.
 *     tags:
 *       - Products
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
 *         description: Filter by product category or category ID.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: '_id'
 *         description: Field to sort by. Can be any field from the product model as well as `TotalPrice` and `rating`.
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
 *         description: Discount filter. If 0, the discount filter is off.
 *       - in: query
 *         name: quantity
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Quantity filter. If 0, the quantity filter is off.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter.
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *           enum: [0, 1, 2, 3, 4, 5]
 *         description: Minimum rating filter.
 *       - in: query
 *         name: sellerId
 *         schema:
 *           type: string
 *         description: Filter by seller ID.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of products.
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid seller ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid sellerId
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

productRoute.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Delete items by IDs
 *     description: Deletes all items whose ID is in the provided array.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of item IDs to delete. Can also be a single ID.
 *                 example: ["5f40a6baac77a903d8f682c6", "5f40a6baac77a903d8f682c7"]
 *     responses:
 *       200:
 *         description: Successfully deleted items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully deleted 2 items.
 *       404:
 *         description: No items found with the given IDs
 *       500:
 *         description: Server error
 */
productRoute.delete('/', productController.deleteProducts);

export default productRoute;
