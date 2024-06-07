import Comment from '../../models/Comment.js';
import Complaint from '../../models/Complaint.js';
import Product from '../../models/Product.js';
import Rating from '../../models/Rate.js';

const adminController = {
  getComplaints: async (req, res) => {
    try {
      let { limit = 10, offset = 0, sortDirection = 1 } = req.query;
      const { startDate, endDate } = req.query;

      limit = parseInt(limit, 10);
      offset = parseInt(offset, 10);
      sortDirection = parseInt(sortDirection, 10);

      const query = {};

      if (startDate || endDate) {
        query.created_at = {};
        if (startDate) query.created_at.$gte = new Date(startDate);
        if (endDate) query.created_at.$lte = new Date(endDate);
      }

      const complaints = await Complaint.find(query)
        .sort({ _id: sortDirection })
        .skip(offset)
        .limit(limit)
        .populate({
          path: 'commentId',
          populate: [{ path: 'authorId' }, { path: 'productId', select: 'name images' }],
        });

      console.log(complaints);
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
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },
};

export default adminController;
