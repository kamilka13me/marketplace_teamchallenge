/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's name
 *         surname:
 *           type: string
 *           description: The user's surname
 *         email:
 *           type: string
 *           format: email
 *           description: The user's unique email address
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *         role:
 *           type: string
 *           description: The ObjectId of the user's role
 *         views:
 *           type: array
 *           items:
 *              type: string
 *              format: uuid
 *           description: Array of product IDs that the user has viewed
 *         wishlist:
 *           type: array
 *           items:
 *              type: string
 *              format: uuid
 *           description: Array of product IDs that the user has viewed
 *       example:
 *         username: JohnDoe
 *         surname: Doe
 *         email: johndoe@example.com
 *         password: "123456"
 *         role: "5e9f8f8f8f8f8f8f8f8f8f8"
 *         views: ["5e9f8f8f8f8f8f8f8f8f8f8","5e9f8f8f8f8f8f8f8f8f8f8"]
 *         wishlist: ["5e9f8f8f8f8f8f8f8f8f8f8","5e9f8f8f8f8f8f8f8f8f8f8"]
 *
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: false,
  },
  surname: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
