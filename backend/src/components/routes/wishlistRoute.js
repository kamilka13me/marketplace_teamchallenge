import express from 'express';

import idToReq from '../../middlewares/chechUserId.js';
import wishlistController from '../controllers/wishlistController.js';

const wishlistRoute = express.Router();
/**
 * @swagger
 * /wishlist/{id}:
 *   put:
 *     summary: Toggle a product in the user's wishlist
 *     description: Adds a product to the user's wishlist if it's not already present, or removes it if it is.
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to toggle in the wishlist.
 *         schema:
 *           type: string
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully added or removed the product from the wishlist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to wishlist successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Access denied due to missing or invalid accessToken.
 *       404:
 *         description: User not found or product not found.
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

wishlistRoute.put('/:id', idToReq(), wishlistController.addToWishlist);

/**
 * @swagger
 * paths:
 *   /wishlist:
 *     get:
 *       summary: Retrieves all items in a user's wishlist
 *       description: This endpoint returns all wishlist items for a specific user, based on the user ID provided. Pagination is supported through limit and offset parameters.
 *       tags:
 *         - Wishlist
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           required: false
 *           description: Limit the number of items returned
 *         - in: query
 *           name: offset
 *           schema:
 *             type: integer
 *           required: false
 *           description: The number of items to skip before starting to collect the result set
 *       responses:
 *         '200':
 *           description: Successfully retrieved wishlist items
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   wishlist:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/WishlistItem'
 *         '401':
 *           description: Unauthorized. Token not found or invalid.
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Unique identifier of the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the product
 */

wishlistRoute.get('/', idToReq(), wishlistController.getAllWishlist);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 * /wishlist:
 *   delete:
 *     summary: Removes all products from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All products have been successfully deleted from the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist cleared successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

wishlistRoute.delete('/', idToReq(), wishlistController.clearWishlist);

export default wishlistRoute;
