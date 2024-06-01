import express from 'express';

import {
  appendFileNamesToBody,
  uploadCategory,
} from '../../middlewares/uploadCategories.js';
import categoryController from '../controllers/categoryController.js';

const categoryRoute = express.Router();
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Creates a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 description: Category description
 *                 example: Diverse electronics
 *               parentId:
 *                 type: string
 *                 description: Category description
 *                 example: _id
 *               image:
 *                 type: string
 *                 description: Path to the category image
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New category created
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad Request: Missing required fields"
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

categoryRoute.post(
  '/',
  uploadCategory.array('image'),
  appendFileNamesToBody,
  categoryController.createCategory,
);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Gets a list of all root categories with nested subcategories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successfully received the list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique category identifier
 *                   name:
 *                     type: string
 *                     description: Category name
 *                   description:
 *                     type: string
 *                     description: Category description
 *                   parentId:
 *                     type: string
 *                     description: Parent category identifier
 *                     nullable: true
 *                   subcategories:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Category'
 *                     description: Nested subcategories
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

categoryRoute.get('/', categoryController.getCategory);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags: [Category]
 *     summary: Delete a category by ID
 *     description: Delete a specific category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRoute.delete('/:id', categoryController.deleteCategory);

export default categoryRoute;
