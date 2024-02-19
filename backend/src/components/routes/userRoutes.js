import express from 'express';

import checkPermission from '../../middlewares/checkPermission.js';
import { validateUser } from '../../middlewares/userValidation.js';
import userController from '../controllers/userController.js';

const router = express.Router();

/**
 * @openapi
 * /users/:
 *   post:
 *     summary: Create new user
 *     description: "Create a new user with optional parameters\n\n premission: \"none\""
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User created successfully"
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user" }
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid request body"
 *       409:
 *         description: User allready exist
 *         content:
 *           application/json:
 *             example:
 *                  message: "user with this email allready exist"
 */
// checkPermission('createUser'),
router.post('/', validateUser, userController.createUser);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by Id
 *     description: "Retrieve details of a user by their Id. \n\n premission: \"getUser\""
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique Id of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               user: { _id: "some_id",  surname: "some_username", username: "some_username", email: "user@example.com" }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *                message: 'Invalid user Id'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Server error"
 */
router.get('/:id', checkPermission('getUser'), userController.getUser);

/**
 * @openapi
 * /users/:
 *   get:
 *     summary: Get all users
 *     description: "Retrieve details of a user by their Id.\n\n premission: \"getAllUsers\""
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               user: [{ _id: "some_id",  surname: "some_username", username: "some_username", email: "user@example.com" },{ _id: "some_id",  surname: "some_username", username: "some_username", email: "user@example.com" }]
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Server error"
 */
router.get('/', checkPermission('getAllUsers'), userController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: "Deletes a user by Id.\n\n premission: \"deleteUser\""
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique Id of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted successfully."
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Error deleting user."
 */

router.delete('/:id', checkPermission('deleteUser'), userController.deleteUser);

export default router;
