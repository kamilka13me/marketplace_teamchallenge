import mongoose from 'mongoose';

import Comment from '../../models/Comment.js';
import Rating from '../../models/Rate.js';

const FeedbackController = {
  createRating: async (req, res) => {
    const { userId, sellerId, productId, rating } = req.body;

    try {
      const options = { new: true, upsert: true };
      const filter = { authorId: userId, sellerId, productId };
      const update = { $set: { rating } };

      const updatedRating = await Rating.findOneAndUpdate(filter, update, options);

      res.status(201).send(updatedRating);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getSellerRating: async (req, res) => {
    const { sellerId, startDate, endDate } = req.query;

    if (!sellerId) {
      return res.status(400).json({ error: 'sellerId is required' });
    }

    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const pipeline = [
      {
        $match: {
          sellerId: sellerObjectId,
          ...(start && { created_at: { $lte: end } }),
        },
      },
      {
        $group: {
          _id: {
            rating: '$rating',
            period: {
              $cond: {
                if: { $gte: ['$created_at', start] },
                then: 'current',
                else: 'previous',
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.rating': 1, '_id.period': 1 }, // Сортування за рейтингом та періодом
      },
    ];

    try {
      const results = await Rating.aggregate(pipeline);

      const formattedResults = results.reduce((acc, { _id, count }) => {
        // eslint-disable-next-line no-param-reassign
        acc[_id.period] = acc[_id.period] || {};
        // eslint-disable-next-line no-param-reassign
        acc[_id.period][_id.rating] = count;

        return acc;
      }, {});

      // Заповнення нулями для відсутніх рейтингів
      const defaultRatings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      const current = { ...defaultRatings, ...formattedResults.current };
      const previous = formattedResults.previous
        ? { ...defaultRatings, ...formattedResults.previous }
        : defaultRatings;

      res.status(200).json({ current, previous });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductRating: async (req, res) => {
    const { productId, startDate, endDate } = req.query;

    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }

    const ProductObjectId = new mongoose.Types.ObjectId(productId);

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const pipeline = [
      {
        $match: {
          productId: ProductObjectId,
          ...(start && { created_at: { $lte: end } }),
        },
      },
      {
        $group: {
          _id: {
            rating: '$rating',
            period: {
              $cond: {
                if: { $gte: ['$created_at', start] },
                then: 'current',
                else: 'previous',
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.rating': 1, '_id.period': 1 }, // Сортування за рейтингом та періодом
      },
    ];

    try {
      const results = await Rating.aggregate(pipeline);

      const formattedResults = results.reduce((acc, { _id, count }) => {
        // eslint-disable-next-line no-param-reassign
        acc[_id.period] = acc[_id.period] || {};
        // eslint-disable-next-line no-param-reassign
        acc[_id.period][_id.rating] = count;

        return acc;
      }, {});

      // Заповнення нулями для відсутніх рейтингів
      const defaultRatings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      const current = { ...defaultRatings, ...formattedResults.current };
      const previous = formattedResults.previous
        ? { ...defaultRatings, ...formattedResults.previous }
        : defaultRatings;

      res.status(200).json({ current, previous });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createComment: async (req, res) => {
    const { userId, parentId, sellerId, productId, comment } = req.body;
    let { images } = req.body;

    images = images.map((name) => `/static/comments/${name}`);
    if (!userId || !comment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Then create a comment with the new ratingId
      const newComment = new Comment({
        authorId: userId,
        sellerId, // Optional
        productId, // Optional
        parentId: parentId || null,
        comment,
        images,
      });

      const savedComment = await newComment.save();

      res.status(201).json(savedComment);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  getComments: async (req, res) => {
    const { startDate, endDate, limit, offset = 0, sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({ error: 'Seller ID is required' });
    }

    const query = { sellerId, parentId: null };

    if (startDate) {
      query.created_at = { $gte: new Date(startDate) };
    }

    if (endDate) {
      query.created_at = { ...query.created_at, $lte: new Date(endDate) };
    }

    try {
      const comments = await Comment.find(query)
        .populate('productId')
        .sort({ created_at: -1 })
        .skip(parseInt(offset, 10))
        .limit(parseInt(limit, 10));

      const commentsWithRatingsAndReplies = await Promise.all(
        comments.map(async (comment) => {
          const rating = await Rating.findOne({
            sellerId: comment.sellerId,
            authorId: comment.authorId,
            productId: comment.productId,
          });

          // Fetch replies for the current comment
          const replies = await Comment.find({ parentId: comment._id });

          return {
            ...comment.toObject(), // Include all existing fields of the comment
            rating: rating ? rating.toObject() : null, // Include the rating if it exists
            replies: replies.map((reply) => reply.toObject()), // Convert each reply document to an object
          };
        }),
      );

      const totalCount = await Comment.countDocuments(query);

      res.status(200).json({
        totalComments: totalCount,
        comments: commentsWithRatingsAndReplies,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCommentsProducts: async (req, res) => {
    const { startDate, endDate, limit, offset = 0, productId } = req.query;

    if (!productId) {
      return res.status(400).json({ error: 'Seller ID is required' });
    }

    const query = { productId, parentId: null };

    if (startDate) {
      query.created_at = { $gte: new Date(startDate) };
    }

    if (endDate) {
      query.created_at = { ...query.created_at, $lte: new Date(endDate) };
    }

    try {
      const comments = await Comment.find(query)
        .populate('productId')
        .sort({ created_at: -1 })
        .skip(parseInt(offset, 10))
        .limit(parseInt(limit, 10));

      const commentsWithRatingsAndReplies = await Promise.all(
        comments.map(async (comment) => {
          const rating = await Rating.findOne({
            sellerId: comment.sellerId,
            authorId: comment.authorId,
            productId: comment.productId,
          });

          // Fetch replies for the current comment
          const replies = await Comment.find({ parentId: comment._id });

          return {
            ...comment.toObject(), // Include all existing fields of the comment
            rating: rating ? rating.toObject() : null, // Include the rating if it exists
            replies: replies.map((reply) => reply.toObject()), // Convert each reply document to an object
          };
        }),
      );

      const totalCount = await Comment.countDocuments(query);

      res.status(200).json({
        totalComments: totalCount,
        comments: commentsWithRatingsAndReplies,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default FeedbackController;
