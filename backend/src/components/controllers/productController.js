import { isValidObjectId } from 'mongoose';

import Product from '../../models/Product.js';

const productController = {
  // create new product
  createProduct: async (req, res) => {
    try {
      const { name, description, price, category, quantity, discount } = req.body;
      let { images } = req.body;

      images = images.map((name) => `/static/products/${name}`);

      const product = {
        name,
        description,
        price,
        category,
        quantity,
        discount,
        images,
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
      const { limit = 10, offset = 0, name, category, discount = 0 } = req.query;
      let { sortBy, sortDirection } = req.query;

      // Building a filter object based on name and category
      const query = {};

      if (name) {
        query.name = { $regex: name, $options: 'i' }; // Search by name
      }
      if (category) {
        query.category = category;
      }
      // eslint-disable-next-line eqeqeq
      if (discount != 0) {
        query.discount = { $gt: discount - 1 };
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

      res.json(products);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send(error.message);
    }
  },
};

export default productController;
