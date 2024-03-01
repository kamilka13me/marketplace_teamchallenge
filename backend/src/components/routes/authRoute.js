import express from 'express';

import checkPermission from '../../middlewares/checkPermission.js';
import authController from '../controllers/authController.js';

const authRoute = express.Router();

/**
 * @openapi
 * /auth/:
 *   post:
 *     summary: Login user
 *     description: "Authenticate a user and return a JWT acessToken.\n\n premission: \"none\""
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
 *     description: "Clears the authentication acessToken cookie and logs the user out.\n\n premission: \"none\""
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

/**
 * @swagger
 * /auth/set-acessToken:
 *   post:
 *     summary: Sets a acessToken in cookies
 *     description: This endpoint accepts a acessToken and sets it in HTTP cookies for further authentication processes.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The JWT refreshToken to be stored in cookies for authentication.
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     responses:
 *       200:
 *         description: Token has been successfully set in cookies.
 *       400:
 *         description: Token is required in the request body.
 *
 *
 */

authRoute.post('/set-acessToken', authController.setToken);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access and refresh tokens
 *     description: Use this endpoint to refresh access and refresh tokens using a refresh token stored in cookies.
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Refresh token stored in cookies.
 *     responses:
 *       200:
 *         description: Token has been set in cookies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token has been set in cookies.
 *       400:
 *         description: Token is required but was not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token is required
 *       500:
 *         description: An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: unexpected error
 */

authRoute.post('/refresh-token', authController.refreshTokens);

/**
 * @swagger
 * responses:
 *   '200':
 *     description: "Success"
 *   '400':
 *     description: "Bad Request - The request could not be understood or was missing required parameters."
 *   '401':
 *     description: "Unauthorized - Authentication failed or user does not have permissions for the requested operation."
 *   '403':
 *     description: "Forbidden - Access denied."
 *   '404':
 *     description: "Not Found - Resource was not found."
 *   '500':
 *     description: "Internal Server Error - An error occurred on the server side."
 */

export default authRoute;
