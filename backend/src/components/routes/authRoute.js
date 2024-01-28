import express from 'express';
import authController from '../controllers/authController.js';
import checkPermission from '../../middlewares/checkPermission.js';

const router = express.Router();

/**
 * @openapi
 * /auth/:
 *   post:
 *     summary: Login user
 *     description: "Authenticate a user and return a JWT token.\n\n premission: \"login\""
 *     tags:
 *       - Authentication
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
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
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

router.post('/', checkPermission('login'), authController.login);

/**
 * @openapi
 * /auth/:
 *   delete:
 *     summary: Logout user
 *     description: "Clears the authentication token cookie and logs the user out.\n\n premission: \"logout\""
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged out successfully.
 *       500:
 *         description: Internal server error.
 */
router.delete('/', checkPermission('logout'), authController.logout);

export default router;
