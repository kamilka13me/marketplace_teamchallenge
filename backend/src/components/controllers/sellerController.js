import mongoose, { isValidObjectId } from 'mongoose';

import Product from '../../models/Product.js';
import findChildCategories from '../../utils/findChildCategories.js';

const sellerController = {
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

      const { userId } = req.body;

      // Building a filter object based on name and category
      const query = {};

      query.sellerId = userId;

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
      const count = await Product.countDocuments({ sellerId: userId });

      res.status(200).json({ count, products });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send(error.message);
    }
  },
};

export default sellerController;
