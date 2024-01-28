import express from 'express';

import RoleController from '../controllers/roleController.js';

import checkPermission from '../../middlewares/checkPermission.js';

const router = express.Router();

/**
 * @openapi
 * /roles:
 *   post:
 *     summary: Create a new role
 *     description: "Create a new role with optional parameters\n\n premission: \"createRole\""
 *     tags: [Roles]
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
 *       500:
 *         description: Server error
 */

router.post('/', checkPermission('createRole'), RoleController.createRole);

/**
 * @openapi
 * /roles:
 *   get:
 *     summary: Get all roles
 *     description: "get all avalible roles\n\n premission: \"getRoles\""
 *     tags: [Roles]
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
 *       500:
 *         description: Server error
 */
router.get('/', checkPermission('getRoles'), RoleController.getRoles);

/**
 * @swagger
 * /roles/{roleId}:
 *   put:
 *     summary: Update a role
 *     tags: [Roles]
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
 *       500:
 *         description: Internal server error
 */
router.put('/:roleId', checkPermission('updateRole'), RoleController.updateRole);

/**
 * @openapi
 * /roles/assign:
 *   post:
 *     summary: Assign a role to a user
 *     description: "Assign a specific role to a user by their IDs.\n\n premission: \"assignRole\""
 *     tags: [Roles]
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
 *         description: Internal server error.
 */
router.post('/:roleId', checkPermission('assignRole'), RoleController.assignRole);

export default router;
