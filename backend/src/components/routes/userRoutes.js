import express from 'express';

import idToReq from '../../middlewares/chechUserId.js';
import checkPermission from '../../middlewares/checkPermission.js';
import { validateUser } from '../../middlewares/userValidation.js';
import userController from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * /users/send-confirm-mail:
 *   get:
 *     summary: Send a confirmation email to the logged-in user.
 *     description: This endpoint sends a confirmation email to the email address associated with the currently authenticated user.
 *     tags: [User]
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: Confirmation email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "mail send successfully."
 *       401:
 *         description: Unauthorized. No user is currently logged in or token is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unexpected error"
 */
router.get('/send-confirm-mail', idToReq(), userController.sendConfirmMail);

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
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890","wishlist": [] }
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhmNDdmMmYyYTAwZmY4Nzk2NTlkYSIsImlhdCI6MTcxMDUwNTUyOCwiZXhwIjoxNzEwNTA4NTI4fQ.MVx5jAMHEljgC9DGHI6XJELpQJZ--QOGIcHIAQ6LYLY"
 *
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
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
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
 *     security:
 *        - bearerAuth: []
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
 *               message: "User get successfully."
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890","wishlist": [] }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *                message: 'Invalid user Id'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
// checkPermission('getUser'),
router.get('/:id', checkPermission('none'), userController.getUser);

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
 *               user: [ user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890","wishlist": [] }, user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890" ,"wishlist": []}]
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
//  checkPermission('getAllUsers'),
router.get('/', userController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     security:
 *       - JWTAuth: []
 *     description: >
 *       This endpoint is only accessible by users with the 'admin' role.
 *
 *       **Required Roles**: `admin`:
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
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
// checkPermission('deleteUser'),
router.delete('/:id', userController.deleteUser);

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
 * /users:
 *   put:
 *     summary: Updates a user's information
 *     description: Allows updating the user's name, surname, date of birth, and phone number.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's updated name
 *               surname:
 *                 type: string
 *                 description: The user's updated surname
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: The user's updated date of birth
 *               phoneNumber:
 *                 type: string
 *                 description: The user's updated phone number
 *             example:
 *               username: "Jane"
 *               surname: "Doe"
 *               dob: "1990-01-01"
 *               phoneNumber: "+1234567890"
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User created successfully."
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890","wishlist": [] }
 *
 *       400:
 *         description: User ID is required or other validation error
 *       404:
 *         description: User not found
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/', checkPermission('none'), userController.updateUser);

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
 * /users/password:
 *   put:
 *     summary: Updates a user's password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 description: The user's current password
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: The new password for the user
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Password updated successfully."
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890","wishlist": [] }
 *       400:
 *         description: Missing fields or incorrect old password
 *       404:
 *         description: User not found
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.put('/password', checkPermission('none'), userController.updatePassword);

/**
 * @swagger
 * /users/recover-password:
 *   post:
 *     summary: Recovering a user's password
 *     description: This endpoint initiates the password recovery process by sending an email with a confirmation link to the user's email.
 *     tags: [User]
 *     requestBody:
 *       description: User email address for password recovery

 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: The password recovery email was sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The password recovery email was sent successfully."
 *       404:
 *         description: User not found with this email address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found with this email address."
 *       500:
 *         description: Error recovering password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error recovering password."
 */
router.post('/recover-password', userController.recoverPassword);

/**
 * @swagger
 * /users/recover-password-confirm:
 *   post:
 *     summary: Confirmation of password recovery
 *     description: Confirmation of changing the user's password.
 *     tags: [User]
 *     requestBody:
 *       description: Confirmation token and new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - confirmToken
 *               - newPassword
 *             properties:
 *               confirmToken:
 *                 type: string
 *                 description: The token that was sent to the user to confirm the password change
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               newPassword:
 *                 type: string
 *                 description: New user password
 *                 example: "newSecurePassword123!"
 *     responses:
 *       200:
 *         description: The user password has been successfully changed and the user has been verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User verify successfully."
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Incorrect request, missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is required"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       419:
 *         description: The confirmation token is out of date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token expired"
 *       500:
 *         description: Unexpected internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unexpected error"
 */
router.post('/recover-password-confirm', userController.recoverPasswordConfirm);

export default router;
