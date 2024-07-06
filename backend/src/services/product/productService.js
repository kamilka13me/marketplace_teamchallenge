import mongoose, { isValidObjectId } from 'mongoose';

import Product from '../../models/Product.js';
import User from '../../models/User.js';
import { CustomError } from '../../utils/customError.js';
import findChildCategories from '../../utils/findChildCategories.js';
import parseSpecifications from '../../utils/parseSpecification.js';

const productService = {
  createProduct: async (productData) => {
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
      specifications,
    } = productData;
    let { images } = productData;

    images = images.map((name) => `/static/products/${name}`);

    const parsedSpecifications = parseSpecifications(specifications);

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

    return { product: saveProduct };
  },

  updateProduct: async (productData) => {
    const {
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
      specifications,
    } = productData;
    let { images } = productData;

    if (images) {
      images = images.map((name) => `/static/products/${name}`);
    }

    const product = {
      id,
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
      specifications: specifications ? parseSpecifications(specifications) : undefined,
      discount_start: discountStart ? new Date(discountStart) : undefined,
      discount_end: discountEnd ? new Date(discountEnd) : undefined,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      throw new CustomError('Product not found');
    }

    return { product: updatedProduct };
  },

  getProductById: async (id) => {
    if (!isValidObjectId(id)) {
      throw new CustomError('Invalid ObjectId format');
    }

    const product = await Product.findById(id);

    if (!product) {
      throw new CustomError('Product not found');
    }

    return product;
  },

  getAllProducts: async (filters) => {
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
    } = filters;
    let { sortDirection = 1, limit = 10, offset = 0 } = filters;

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
        throw new CustomError('Invalid sellerId');
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
              if: {
                $and: [{ $gt: ['$discount', 0] }, { $lte: ['$discount', 100] }],
              },
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
    const result = { count, products };

    return result;
  },

  deleteProducts: async (ids) => {
    const idsToDelete = Array.isArray(ids) ? ids : [ids];
    const result = await Product.deleteMany({
      _id: { $in: idsToDelete },
    });

    if (result.deletedCount === 0) {
      throw new CustomError('No items found with the given IDs');
    }

    return `Successfully deleted ${result.deletedCount} items.`;
  },

  updateView: async (productId, userId) => {
    // find user
    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError('Acces denied. User not found.');
    }

    // find product
    const product = await Product.findById(productId);

    if (!product) {
      throw new CustomError('Product not found');
    }

    if (!user.views.includes(productId)) {
      await Product.findByIdAndUpdate(productId, { $inc: { views: 1 } });
      user.views.push(productId);
      await user.save();
    }

    return true;
  },
};

export default productService;
