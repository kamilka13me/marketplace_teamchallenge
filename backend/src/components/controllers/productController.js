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

  // update product by id
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
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

      const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      res.status(200).json({ product: updatedProduct });
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
      } = req.query;
      let { sortDirection = 1, limit = 10, offset = 0 } = req.query;

      limit = parseInt(limit, 10);
      offset = parseInt(offset, 10);
      sortDirection = parseInt(sortDirection, 10) || 1;

      const query = {};

      if (name) {
        query.name = { $regex: name, $options: 'i' };
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
      if (discount !== 0) {
        query.discount = { $gt: discount - 1 };
      }
      if (quantity !== 0) {
        query.quantity = { $gt: quantity - 1 };
      }
      if (sellerId) {
        if (mongoose.Types.ObjectId.isValid(sellerId)) {
          query.sellerId = new mongoose.Types.ObjectId(sellerId);
        } else {
          return res.status(400).json({ message: 'Invalid sellerId' });
        }
      }

      if (status) {
        query.status = status;
      }

      const aggregationPipeline = [
        { $match: query },
        {
          $addFields: {
            TotalPrice: {
              $cond: {
                if: { $and: [{ $gt: ['$discount', 0] }, { $lte: ['$discount', 100] }] },
                then: {
                  $multiply: [
                    '$price',
                    { $subtract: [1, { $divide: ['$discount', 100] }] },
                  ],
                },
                else: '$price',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'ratings',
            localField: '_id',
            foreignField: 'productId',
            as: 'ratings',
          },
        },
        {
          $addFields: {
            averageRating: { $avg: '$ratings.rating' },
          },
        },
        {
          $project: {
            ratings: 0, // Remove the ratings field from the final results
          },
        },
      ];

      if (minPrice !== undefined || maxPrice !== undefined) {
        const priceFilter = {};

        if (minPrice !== undefined) priceFilter.$gte = parseFloat(minPrice);
        if (maxPrice !== undefined) priceFilter.$lte = parseFloat(maxPrice);
        aggregationPipeline.push({ $match: { TotalPrice: priceFilter } });
      }

      if (minRating !== undefined) {
        aggregationPipeline.push({
          $match: { averageRating: { $gte: parseFloat(minRating) } },
        });
      }

      const sortObject = {};

      sortObject[sortBy || '_id'] = sortDirection;

      if (sortBy === 'TotalPrice' || sortBy === 'rating') {
        aggregationPipeline.push({
          $sort: {
            [sortBy === 'rating' ? 'averageRating' : 'TotalPrice']: sortDirection,
          },
        });
      } else {
        aggregationPipeline.push({ $sort: sortObject });
      }

      aggregationPipeline.push({ $skip: offset });
      aggregationPipeline.push({ $limit: limit });

      const products = await Product.aggregate(aggregationPipeline);

      // Copy the pipeline to count the number of documents
      const countPipeline = [...aggregationPipeline];

      countPipeline.pop(); // Remove the limit stage
      countPipeline.pop(); // Remove the skip stage
      countPipeline.push({ $count: 'count' });

      const countResult = await Product.aggregate(countPipeline);
      const count = countResult.length > 0 ? countResult[0].count : 0;

      return res.status(200).json({ count, products });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Check if the status is valid
      if (!['published', 'canceled', 'under-consideration', 'blocked'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: 'Support not found' });
      }

      product.status = status;
      await product.save();

      res.status(200).json({ message: 'product status updated successfully' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error updating product status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

export default productController;
