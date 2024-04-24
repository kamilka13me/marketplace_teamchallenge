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
 *         condition:
 *           type: string
 *           description: The condition of the product
 *         brand:
 *           type: string
 *           description: The brand of the product
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
 *           default: 0
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: The images URLs of the product
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was created
 *         discount_start:
 *           type: string
 *           format: date-time
 *           description: The start time of the discount period
 *         discount_end:
 *           type: string
 *           format: date-time
 *           description: The end time of the discount period
 *         sellerId:
 *           type: string
 *           description: The ID of the user who is selling the product
 *         isActive:
 *           type: boolean
 *           description: The active status of the product
 *         status:
 *           type: string
 *           description: The status of the product
 *         specifications:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               specification:
 *                 type: string
 *                 description: The specification type
 *               specificationDescription:
 *                 type: string
 *                 description: The description of the specification
 *           description: The list of product specifications
 *       example:
 *         name: "Example Product Name"
 *         description: "This is an example product description."
 *         condition: "New"
 *         brand: "Example Brand"
 *         price: 99.99
 *         discount: 10
 *         category: "Example Category"
 *         quantity: 100
 *         views: 150
 *         images: ["/image1.jpg", "/image2.jpg"]
 *         created_at: "2023-01-01T00:00:00Z"
 *         discount_start: "2023-01-05T00:00:00Z"
 *         discount_end: "2023-01-10T00:00:00Z"
 *         sellerId: "5f64e841303d48b414fd1e77"
 *         isActive: true
 *         status: "Available"
 *         specifications: [
 *           {
 *             specification: "Processor",
 *             specificationDescription: "Intel Core i7"
 *           },
 *           {
 *             specification: "Graphics Card",
 *             specificationDescription: "NVIDIA GTX 3080"
 *           }
 *         ]
 */

import mongoose from 'mongoose';

const specificationSchema = new mongoose.Schema(
  {
    specification: { type: String, required: true },
    specificationDescription: { type: String, required: true },
  },
  { _id: false },
);
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
  brand: {
    type: String,
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
    default: 0,
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
  discount_start: {
    type: Date,
  },
  discount_end: {
    type: Date,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  condition: {
    type: String,
  },
  status: {
    type: String,
  },
  specifications: [specificationSchema],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
