import Comment from '../../models/Comment.js';
import Complaint from '../../models/Complaint.js';
import Product from '../../models/Product.js';
import Rating from '../../models/Rate.js';

const adminController = {
  getComplaints: async (req, res) => {
    try {
      let { limit = 10, offset = 0 } = req.query;

      limit = parseInt(limit, 10);
      offset = parseInt(offset, 10);

      // Знаходимо оскарження
      const complaints = await Complaint.find()
        .skip(offset)
        .limit(limit)
        .populate({
          path: 'commentId',
          populate: [
            { path: 'authorId', select: 'name' },
            { path: 'productId', select: 'name price' },
          ],
        });

      const totalCount = await Complaint.countDocuments();

      // Знаходимо продукти та обчислюємо середній рейтинг
      const productIds = complaints.map((c) => c.commentId?.productId).filter((id) => id);
      const ratings = await Rating.aggregate([
        { $match: { productId: { $in: productIds } } },
        { $group: { _id: '$productId', averageRating: { $avg: '$rating' } } },
      ]);

      const ratingsMap = ratings.reduce((acc, rating) => {
        acc[rating._id] = rating.averageRating;
        return acc;
      }, {});

      // Додаємо додаткову інформацію до оскаржень
      const complaintsWithDetails = await Promise.all(
        complaints.map(async (complaint) => {
          const comment = complaint.commentId
            ? await Comment.findById(complaint.commentId._id).populate('authorId')
            : null;
          const response = comment
            ? await Comment.findOne({ parentId: comment._id }).populate('authorId')
            : null;

          const product = complaint.commentId
            ? await Product.findById(complaint.commentId.productId._id)
            : null;

          const averageRating = product ? ratingsMap[product._id] || 0 : 0;

          return {
            ...complaint.toObject(),
            comment: comment || null,
            response: response || null,
            product: product
              ? { ...product.toObject(), averageRating }
              : { _id: 0, name: '', price: 0, averageRating: 0 },
          };
        }),
      );

      res.status(200).json({
        totalCount,
        complaints: complaintsWithDetails,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },
};

export default adminController;

