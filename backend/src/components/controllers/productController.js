import mongoose, { isValidObjectId } from 'mongoose';

import Category from '../../models/Category.js';
import Product from '../../models/Product.js';
import findChildCategories from '../../utils/findChildCategories.js';

const productController = {
  // create new product
  createProduct: async (req, res) => {
    try {
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
      } = req.body;

      let { images, specifications } = req.body;

      images = images.map((name) => `/static/products/${name}`);

      let parsedSpecifications;

      try {
        if (
          !specifications.trim().startsWith('[') ||
          !specifications.trim().endsWith(']')
        ) {
          specifications = `[${specifications}]`;
        }

        parsedSpecifications = JSON.parse(specifications);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid request body in specifications' });
      }

      const product = {
        name,
        description,
        price,
        brand,
        condition,
        status,
        category,
        quantity,
        discount,
        images,
        specifications: parsedSpecifications,
        sellerId: userId,
        discount_start: discountStart ? new Date(discountStart) : undefined,
        discount_end: discountEnd ? new Date(discountEnd) : undefined,
      };

      const newProduct = new Product(product);
      const saveProduct = await newProduct.save();

      res.status(201).json({ product: saveProduct });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ error });
    }
  },

  // get product by id
  getOneProduct: async (req, res) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ObjectId format' });
      }

      const product = await Product.findById(id);

      if (!product) {
        // If the product is not found, we return a 404 status
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ product });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  },

  // get all products
  getAllProducts: async (req, res) => {
    try {
      const {
        limit = 10,
        offset = 0,
        name,
        category,
        discount = 0,
        quantity = 1,
      } = req.query;
      let { sortBy, sortDirection } = req.query;

      // Building a filter object based on name and category
      const query = {};

      if (name) {
        query.name = { $regex: name, $options: 'i' }; // Search by name
      }
      if (category) {
        if (mongoose.Types.ObjectId.isValid(category)) {
          const categoryObjectId = new mongoose.Types.ObjectId(category);
          const categoryIds = [categoryObjectId];

          await findChildCategories(categoryObjectId, categoryIds);
          query.category = { $in: categoryIds.map((id) => id.toString()) };
        } else {
          query.category = category;
        }
      }

      // eslint-disable-next-line eqeqeq
      if (discount != 0) {
        query.discount = { $gt: discount - 1 };
      }
      // eslint-disable-next-line eqeqeq
      if (quantity != 0) {
        query.quantity = { $gt: quantity - 1 };
      }

      // Create a sorting object
      const sortObject = {};

      sortBy = sortBy || '_id';
      sortDirection = parseInt(sortDirection, 10) || 1;

      sortObject[sortBy] = sortDirection;

      // Retrieving products from the database
      const products = await Product.find(query)
        .sort(sortObject)
        .skip(offset)
        .limit(limit);

      const count = await Product.countDocuments();

      res.status(200).json({ count, products });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send(error.message);
    }
  },

  deleteProducts: async (req, res) => {
    const { ids } = req.body;

    try {
      const idsToDelete = Array.isArray(ids) ? ids : [ids];
      const result = await Product.deleteMany({
        _id: { $in: idsToDelete },
      });

      if (result.deletedCount === 0) {
        return res.status(404).send('No items found with the given IDs.');
      }

      res.send(`Successfully deleted ${result.deletedCount} items.`);
    } catch (error) {
      res.status(500).send(`Server error: ${error.message}`);
    }
  },
};

export default productController;
