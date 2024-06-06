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
          populate: [{ path: 'authorId' }, { path: 'productId', select: 'name images' }],
        });

      // console.log(complaints[0].commentId);

      const totalCount = await Complaint.countDocuments();

      // Знаходимо продукти та обчислюємо середній рейтинг

      // Додаємо додаткову інформацію до оскаржень
      const complaintsWithDetails = await Promise.all(
        complaints.map(async (complaint) => {
          const comment = complaint.commentId
            ? (await Comment.findById(complaint.commentId._id).populate({
                path: 'authorId',
                select: 'name email',
              })) &&
              (await Rating.findOne({
                authorId: complaint.commentId.authorId,
                productId: complaint.commentId.productId,
              }).populate({
                path: 'authorId',
                select: 'name email',
              }))
            : null;
          // console.log(complaint);
          const response = comment
            ? await Comment.findOne({ parentId: comment._id }).populate('authorId')
            : null;

          const product = complaint.commentId.productId;

          // const averageRating = product ? ratingsMap[product._id] || 0 : 0;

          return {
            // ...complaint.toObject(),
            comment: comment || null,
            response: response || null,
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
      // console.error(error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },
};

export default adminController;
