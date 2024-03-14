import express from 'express';

import checkPermission from '../../middlewares/checkPermission.js';
import RoleController from '../controllers/roleController.js';

const router = express.Router();

/**
 * @openapi
 * /roles:
 *   post:
 *     summary: Create a new role
 *     description: "Create a new role with optional parameters\n\n premission: \"createRole\""
 *     tags: [Roles]
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: admin
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [
 *                              "createUser",
 *                              "getUser",
 *                              "getAllUsers",
 *                          ]
 *             required:
 *               - name
 *               - permissions
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Bad request
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.post('/', checkPermission('createRole'), RoleController.createRole);

/**
 * @openapi
 * /roles:
 *   get:
 *     summary: Get all roles
 *     description: "get all avalible roles\n\n premission: \"getRoles\""
 *     tags: [Roles]
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: user
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["read"]
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', checkPermission('getRoles'), RoleController.getRoles);

/**
 * @swagger
 * /roles/{roleId}:
 *   put:
 *     summary: Update a role
 *     tags: [Roles]
 *     security:
 *       - JWTAuth: []
 *     description: add permissions to avalibale roles<br><br>
 *           premission:"updateRole"<br><br>
 *           Available permissions:[
 *          <br>Users:["createUser","getUser","getAllUsers","deleteUser",]
 *          <br>Roles:["updateRole","assignRole","createRole","getRoles",]
 *          <br>Authentication:["login","logout"]
 *          <br>]
 *
 *
 *
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionsToAdd:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["read", "write", "delete"]
 *                 description: Array of permissions to add to the role
 *     responses:
 *       200:
 *         description: The role was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:roleId', checkPermission('updateRole'), RoleController.updateRole);
/**
 * @openapi
 * /roles/init:
 *   post:
 *     summary: Init roles
 *     description: "Init default users roles and \n\ncreate superadmin : email: superadmin@gmail.com password: superadmin .\n\n premission: \"none\" "
 *     tags: [Roles]
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       '201':
 *         description: Role and superadmin successfully crated .
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: string
 *                     example: user
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/init', RoleController.initRoles);

/**
 * @openapi
 * /roles/assign:
 *   post:
 *     summary: Assign a role to a user
 *     description: "Assign a specific role to a user by their IDs.\n\n premission: \"assignRole\""
 *     tags: [Roles]
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user.
 *               roleId:
 *                 type: string
 *                 description: The unique identifier of the role to assign.
 *             example:
 *               userId: "60d0fe4f5311236168a109ca"
 *               roleId: "60d0fe4f5311236168a109cb"
 *     responses:
 *       '200':
 *         description: Role successfully assigned to the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid input.
 *       '404':
 *         description: User or role not found.
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/:roleId', checkPermission('assignRole'), RoleController.assignRole);

export default router;
