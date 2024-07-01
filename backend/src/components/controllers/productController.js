import mongoose, { isValidObjectId } from 'mongoose';

import Category from '../../models/Category.js';
import Product from '../../models/Product.js';
import User from '../../models/User.js';
import productService from '../../services/product/productService.js';
import { CustomError } from '../../utils/customError.js';
import findChildCategories from '../../utils/findChildCategories.js';

const productController = {
  // create new product
  createProduct: async (req, res) => {
    const {
      name,
      description,
      brand,
      condition,
      status,
      price,
      category,
      quantity,
      discount,
      userId,
      discountStart,
      discountEnd,
      images,
      specifications,
    } = req.body;

    if (!name || !price || !userId || !images || !specifications) {
      return res.status(400).json({
        message: 'Name, price, userId, images, and specifications are required',
      });
    }

    try {
      const productData = {
        name,
        description,
        brand,
        condition,
        status,
        price,
        category,
        quantity,
        discount,
        userId,
        discountStart,
        discountEnd,
        images,
        specifications,
      };

      const result = await productService.createProduct(productData);

      res.status(201).json({ product: result });
    } catch (error) {
      // error 400
      if (error instanceof CustomError && error.message === 'Parse Specification error') {
        res.status(400).json({ message: 'Parse Specification error' });
      }
      // error 500
      else {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },

  // update product by id
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new CustomError('Product not found');
      }
      const {
        name,
        description,
        brand,
        condition,
        status,
        price,
        category,
        quantity,
        discount,
        discountStart,
        discountEnd,
        images,
        specifications,
      } = req.body;

      const productData = {
        id,
        name,
        description,
        brand,
        condition,
        status,
        price,
        category,
        quantity,
        discount,
        discountStart,
        discountEnd,
        images,
        specifications,
      };
      const updatedProduct = await productService.updateProduct(productData);

      res.status(200).json(updatedProduct);
    } catch (error) {
      // error 400
      if (error instanceof CustomError && error.message === 'Parse Specification error') {
        res.status(400).json({ message: 'Parse Specification error' });
      }
      // error 404
      else if (error instanceof CustomError && error.message === 'Product not found') {
        res.status(404).json({ message: 'Product not found' });
      }
      // error 500
      else {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },

  // get product by id
  getOneProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await productService.getProductById(id);

      res.status(200).json({ product });
    } catch (error) {
      // error 400
      if (error instanceof CustomError && error.message === 'Invalid ObjectId format') {
        res.status(400).json({ message: 'Invalid ObjectId format' });
      }
      // error 404
      else if (error instanceof CustomError && error.message === 'Product not found') {
        res.status(404).json({ message: 'Product not found' });
      }
      // error 500
      else {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },

  // get all products
  getAllProducts: async (req, res) => {
    try {
      const {
        name,
        category,
        discount = 0,
        quantity = 1,
        minPrice,
        maxPrice,
        minRating,
        sellerId,
        sortBy,
        status,
        sortDirection,
        limit,
        offset,
      } = req.query;

      const filters = {
        name,
        category,
        discount,
        quantity,
        minPrice,
        maxPrice,
        minRating,
        sellerId,
        sortBy,
        status,
        sortDirection,
        limit,
        offset,
      };

      const products = await productService.getAllProducts(filters);

      res.status(200).json(products);
    } catch (error) {
      if (error instanceof CustomError && error.message === 'Invalid sellerId') {
        res.status(400).json({ message: 'Invalid sellerId' });
      } else {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },

  deleteProducts: async (req, res) => {
    try {
      const { ids } = req.body;

      const result = await productService.deleteProducts(ids);

      res.status(200).json(result);
    } catch (error) {
      // 404
      if (
        error instanceof CustomError &&
        error.message === 'No items found with the given IDs'
      ) {
        res.status(404).json({ message: 'No items found with the given IDs' });
      } else {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Check if the status is valid
      if (!['published', 'canceled', 'under-consideration', 'blocked'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      const productData = { id, status };

      await productService.updateProduct(productData);

      res.status(200).json({ message: 'product status updated successfully' });
    } catch (error) {
      // error 404
      if (error instanceof CustomError && error.message === 'Product not found') {
        res.status(404).json({ message: 'Product not found' });
      }
      // error 500
      else {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  },

  updateView: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
      const user = await User.findById(userId).populate('role');

      if (!user) {
        return res.status(401).json({ message: 'Access denied. User not found.' });
      }

      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: 'Support not found' });
      }

      // Check if the user has already viewed the product
      if (!user.views.includes(id)) {
        await Product.findByIdAndUpdate(id, { $inc: { views: 1 } }); // Increase views only if the user has not viewed the product before
        user.views.push(id);
        await user.save();

        return res.status(200).json({ message: 'views added' });
      }

      return res.status(200).json({ message: 'allready views' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error updating product status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

export default productController;
