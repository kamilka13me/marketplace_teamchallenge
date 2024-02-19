/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *         - permissions
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the role
 *         name:
 *           type: string
 *           description: Unique name of the role
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: List of permissions assigned to the role
 *       example:
 *         _id: d5fE_asz
 *         name: admin
 *         permissions: ["create_user", "delete_user", "view_all_users"]
 */

import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [String],
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
