/**
 * @swagger
 * components:
 *   schemas:
 *     Support:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user
 *         topic:
 *           type: string
 *           description: Topic of the support message
 *         content:
 *           type: string
 *           description: Content of the support message
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         status:
 *           type: string
 *           enum: [open, in-progress, closed]
 *           description: Status of the support message
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the message was created
 */

import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  topic: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
    enum: ['new', 'consider', 'work', 'closed'],
    default: 'new',
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Support = mongoose.model('Support', supportSchema);

export default Support;
