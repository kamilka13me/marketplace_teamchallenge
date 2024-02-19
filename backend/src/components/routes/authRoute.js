import express from 'express';

import checkPermission from '../../middlewares/checkPermission.js';
import authController from '../controllers/authController.js';

const authRoute = express.Router();

/**
 * @openapi
 * /auth/:
 *   post:
 *     summary: Login user
 *     description: "Authenticate a user and return a JWT token.\n\n premission: \"none\""
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
 *        description: Successful login
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Auth success.
 *                user:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    username:
 *                      type: string
 *                    surname:
 *                      type: string
 *                    email:
 *                      type: string
 *                    role:
 *                      type: string
 *              example:
 *               message: "Auth success."
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user" }
 *
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
// checkPermission('login'),
authRoute.post('/', authController.login);

/**
 * @openapi
 * /auth/:
 *   delete:
 *     summary: Logout user
 *     description: "Clears the authentication token cookie and logs the user out.\n\n premission: \"none\""
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
// checkPermission('logout'),
authRoute.delete('/', authController.logout);

export default authRoute;
