import mongoose from 'mongoose';

import Comment from '../../models/Comment.js';
import Complaint from '../../models/Complaint.js';
import Product from '../../models/Product.js';
import Rating from '../../models/Rate.js';
import Role from '../../models/Role.js';
import Seller from '../../models/SellerInfo.js';
import User from '../../models/User.js';

const adminController = {
  getComplaints: async (req, res) => {
    try {
      let { limit = 10, offset = 0, sortDirection = 1 } = req.query;

      const { startDate, endDate, search } = req.query;

      limit = parseInt(limit, 10);
      offset = parseInt(offset, 10);
      sortDirection = parseInt(sortDirection, 10);

      const query = {};

      if (startDate || endDate) {
        query.created_at = {};
        if (startDate) query.created_at.$gte = new Date(startDate);
        if (endDate) query.created_at.$lte = new Date(endDate);
      }

      if (search) {
        // Check if search is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(search)) {
          query._id = search; // Search by support ID if search is a valid ObjectId
        } else {
          // Searching the user collection for a partial match in the username and email fields
          const users = await User.find({
            $or: [
              { username: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
            ],
          });

          // Create an array of userIds from the IDs of the found users
          const userIds = users.map((user) => user._id);

          if (userIds.length > 0) {
            // Find comments by these user IDs
            const comments = await Comment.find({
              authorId: { $in: userIds },
            });

            // Create an array of commentIds from the IDs of the found comments
            const commentIds = comments.map((comment) => comment._id);

            if (commentIds.length > 0) {
              query.commentId = { $in: commentIds };
            } else {
              return res.status(200).json([]);
            }
          } else {
            return res.status(200).json([]);
          }
        }
      }

      if (search) {
        // Check if search is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(search)) {
          query._id = search; // Search by support ID if search is a valid ObjectId
        } else {
          // Searching the user collection for a partial match in the username and email fields
          const users = await User.find({
            $or: [
              { username: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
            ],
          });

          // Create an array of userIds from the IDs of the found users
          const userIds = users.map((user) => user._id);

          if (userIds.length > 0) {
            // Find comments by these user IDs
            const comments = await Comment.find({
              authorId: { $in: userIds },
            });

            // Create an array of commentIds from the IDs of the found comments
            const commentIds = comments.map((comment) => comment._id);

            if (commentIds.length > 0) {
              query.commentId = { $in: commentIds };
            } else {
              return res.status(200).json([]);
            }
          } else {
            return res.status(200).json([]);
          }
        }
      }

      const complaints = await Complaint.find(query)
        .sort({ _id: sortDirection })
        .skip(offset)
        .limit(limit)
        .populate({
          path: 'commentId',
          populate: [{ path: 'authorId' }, { path: 'productId', select: 'name images' }],
        });

      const totalCount = await Complaint.countDocuments(query);

      const complaintsWithDetails = await Promise.all(
        complaints.map(async (complaint) => {
          const comment = complaint.commentId
            ? await Comment.findById(complaint.commentId._id).populate({
                path: 'authorId',
                select: 'username email',
              })
            : null;

          const rating = comment
            ? await Rating.findOne({
                authorId: comment.authorId,
                productId: comment.productId,
              }).select('rating')
            : null;

          const response = comment
            ? await Comment.findOne({ parentId: complaint.commentId._id }).populate({
                path: 'authorId',
                select: 'username email',
              })
            : null;

          const product = complaint.commentId.productId;

          return {
            _id: complaint._id,
            reason: complaint.reason,
            createdAt: complaint.created_at,
            comment: comment
              ? {
                  _id: comment._id,
                  username: comment.authorId.username,
                  email: comment.authorId.email,
                  comment: comment.comment,
                  images: comment.images,
                  rating: rating ? rating.rating : 0,
                }
              : null,
            response: response
              ? {
                  _id: response._id,
                  username: response.authorId.username,
                  email: response.authorId.email,
                  comment: response.comment,
                  images: response.images,
                }
              : null,
            product: product
              ? { ...product.toObject() }
              : { _id: 0, name: '', price: 0, averageRating: 0 },
          };
        }),
      );

      res.status(200).json({
        totalCount,
        complaints: complaintsWithDetails,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },

  deleteCoplaints: async (req, res) => {
    try {
      const { id } = req.params;

      const complaint = await Complaint.findByIdAndDelete(id);

      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }

      res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  deleteCoplaintsAndComment: async (req, res) => {
    try {
      const { id } = req.params;

      const complaint = await Complaint.findByIdAndDelete(id);

      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }

      const comment = await Comment.findByIdAndDelete(complaint.commentId);

      if (comment) {
        await Rating.findOneAndDelete({
          authorId: comment.authorId,
          productId: comment.productId,
        });
      }

      res
        .status(200)
        .json({ message: 'Complaint, comment, and rating deleted successfully' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getStatistics: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      // Check for dates and create a filter
      const dateFilter = {};

      if (startDate) {
        dateFilter.$gte = new Date(startDate);
      }
      if (endDate) {
        dateFilter.$lte = new Date(endDate);
      }

      const userRole = await Role.findOne({ name: { $regex: 'user' } });
      const sellerRole = await Role.findOne({ name: { $regex: 'seller' } });
      const matchConditionUser = { role: userRole._id };
      const matchConditionSaler = { role: sellerRole._id };

      if (startDate || endDate) {
        matchConditionUser.created_at = dateFilter;
        matchConditionSaler.created_at = dateFilter;
      }

      // Grouping users by day for newUsersPerDay
      const newUsersPerDay = await User.aggregate([
        { $match: matchConditionUser },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      // Grouping sellers by day for newSalersPerDay
      const newSalersPerDay = await User.aggregate([
        { $match: matchConditionSaler },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      // Formatting the results
      const formattedNewUsersPerDay = newUsersPerDay.map((item) => ({
        date: item._id,
        count: item.count,
      }));

      const formattedNewSalersPerDay = newSalersPerDay.map((item) => ({
        date: item._id,
        count: item.count,
      }));

      // Frozen data for other fields
      const openContactsCurrentMonth = 150;
      const openContactsPreviousMonth = 120;
      const visitsCurrentMonth = 3000;
      const visitsPreviousMonth = 2800;

      res.status(200).json({
        newUsersPerDay: formattedNewUsersPerDay,
        newSalersPerDay: formattedNewSalersPerDay,
        openContactsCurrentMonth,
        openContactsPreviousMonth,
        visitsCurrentMonth,
        visitsPreviousMonth,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching statistics:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  deleteProductsWithNoSeller: async (req, res) => {
    try {
      // Знайти всі sellerId в колекції sellers
      const sellers = await Seller.find({}, { sellerId: 1 }).exec();
      const sellerIds = sellers.map((seller) => seller.sellerId);

      // Знайти продукти, створені користувачами без відповідного запису в колекції sellers
      const productsWithoutSellers = await Product.find({
        sellerId: { $nin: sellerIds },
      }).exec();

      res.json(productsWithoutSellers);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send('Server Error');
    }
  },
};

export default adminController;
