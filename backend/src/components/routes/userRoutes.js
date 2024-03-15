import express from 'express';

import idToReq from '../../middlewares/chechUserId.js';
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
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890" }
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
 *       - JWTAuth: []
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
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890" }
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
 *               user: [ user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890" }, user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890" }]
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
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890" }
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
 *               user: { _id: "some_id", username: "some_username", surname: "some_surname", email: "user@example.com" ,role: "user", dob: "1990-01-01T00:00:00.000Z" , isAccountConfirm: false,  phoneNumber: "+1234567890" }
 *       400:
 *         description: Missing fields or incorrect old password
 *       404:
 *         description: User not found
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.put('/password', checkPermission('none'), userController.updatePassword);

export default router;
