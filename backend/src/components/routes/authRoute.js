import express from 'express';

import checkPermission from '../../middlewares/checkPermission.js';
import authController from '../controllers/authController.js';

const authRoute = express.Router();

/**
 * @openapi
 * /auth/:
 *   post:
 *     summary: Login user
 *     description: "Authenticate a user. Return a JWT `accessToken` and set `refreshToken` to http only cookies.\n\n premission: `none`"
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
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890","wishlist": [] }
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhmNDdmMmYyYTAwZmY4Nzk2NTlkYSIsImlhdCI6MTcxMDUwNTUyOCwiZXhwIjoxNzEwNTA4NTI4fQ.MVx5jAMHEljgC9DGHI6XJELpQJZ--QOGIcHIAQ6LYLY"
 *
 *       '403':
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid password
 *       '422':
 *         description: Invalid email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email
 *       '423':
 *         description: too many failed attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: too many failed attempts
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
// checkPermission('login'),
authRoute.post('/', authController.login);

/**
 * @openapi
 * /auth/:
 *   delete:
 *     summary: Logout user
 *     description: "Clears the authentication accessToken cookie and logs the user out.\n\n premission: \"none\""
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged out successfully.
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
// checkPermission('logout'),
authRoute.delete('/', authController.logout);

/**
 * @swagger
 * /auth/set-accessToken:
 *   post:
 *     summary: Sets a accessToken in cookies
 *     description: This endpoint accepts a accessToken and sets it in HTTP cookies for further authentication processes.
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
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

authRoute.post('/set-accessToken', authController.setToken);

/**
 * @swagger
 * /auth/refresh-token:
 *   get:
 *     summary: Refresh Access Token
 *     description: Use this API to refresh the access token using a refresh token.
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Access token has been successfully refreshed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token has been updated
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.QSflKxofmeJ6_y7TIphn2LJInrG7SWMweq5Z7HePpWk
 *       400:
 *         description: Bad request, token is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is required
 *       401:
 *         description: Unauthorized, token expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token expired
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

authRoute.get('/refresh-token', authController.refreshTokens);

export default authRoute;
