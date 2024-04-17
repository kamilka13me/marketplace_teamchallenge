/**
 * @openapi
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         topic:
 *           type: string
 *           description: The message topic
 *         content:
 *           type: string
 *           description: The message content
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: The images URLs of the message
 *
 *
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
  images: [
    {
      type: String,
      required: false,
    },
  ],
});

const Support = mongoose.model('Support', supportSchema);

export default Support;
