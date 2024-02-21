/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category.
 *         description:
 *           type: string
 *           description: Description of the category.
 *         parentId:
 *           type: string
 *           description: Reference to the parent category's ID.
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: String,
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
