import express from 'express';

import RoleController from '../controllers/roleController.js';

const router = express.Router();

/**
 * @openapi
 * /roles:
 *   post:
 *     summary: Create a new role
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
 *                 example: ["read", "write", "delete"]
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

router.post('/', RoleController.createRole);

/**
 * @openapi
 * /roles:
 *   get:
 *     summary: Get all roles
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
router.get('/', RoleController.getRoles);

/**
 * @openapi
 * /roles/{roleId}:
 *   put:
 *     summary: Update a role
 *     description: Updates an existing role with new information
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: Unique identifier of the role
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of permissions for the role
 *     responses:
 *       '200':
 *         description: Role successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       '404':
 *         description: Role not found
 *       '500':
 *         description: Internal server error
 */

router.put('/:roleId', RoleController.updateRole);


/**
 * @openapi
* /roles/assign:
 *   post:
 *     summary: Assign a role to a user
 *     description: Assign a specific role to a user by their IDs.
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
router.post('/:roleId', RoleController.assignRole);

export default router;
