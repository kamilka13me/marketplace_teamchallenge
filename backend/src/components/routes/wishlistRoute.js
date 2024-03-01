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
 *       500:
 *         description: An error occurred while updating the wishlist.
 */

wishlistRoute.put('/:id', idToReq(), wishlistController.addToWishlist);

export default wishlistRoute;
