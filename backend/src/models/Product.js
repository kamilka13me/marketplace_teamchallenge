/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         discount:
 *           type: number
 *           description: The discount on the product (if any)
 *           default: 0
 *         category:
 *           type: string
 *           description: The category of the product
 *         quantity:
 *           type: number
 *           description: The quantity of the product in stock
 *         views:
 *           type: number
 *           description: The number of views of the product
 *           required: false
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: The images URLs of the product
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was created
 *       example:
 *         name: "Example Product Name"
 *         description: "This is an example product description."
 *         price: 99.99
 *         discount: 10
 *         category: "Example Category"
 *         quantity: 100
 *         views: 150
 *         images: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
 *         created_at: "2023-01-01T00:00:00Z"
 */

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    required: false,
    default: false,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  views: {
    type: Number,
    required: false,
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
