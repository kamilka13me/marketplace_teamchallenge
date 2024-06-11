import mongoose from 'mongoose';

import Comment from '../../models/Comment.js';
import Complaint from '../../models/Complaint.js';
import Product from '../../models/Product.js';
import Rating from '../../models/Rate.js';
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
};

export default adminController;
