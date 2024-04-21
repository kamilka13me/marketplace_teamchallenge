import mongoose from 'mongoose';

import Comment from '../../models/Comment.js';
import Rating from '../../models/Rate.js';

const FeedbackController = {
  createRating: async (req, res) => {
    const { userId, sellerId, productId, rating } = req.body;

    try {
      const newRating = new Rating({
        authorId: userId,
        sellerId,
        productId,
        rating,
      });

      await newRating.save();
      res.status(201).send(newRating);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getRating: async (req, res) => {
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

  createComment: async (req, res) => {
    const { userId, parentId, sellerId, productId, comment, images } = req.body;
    let { rating } = req.body;

    if (!userId || !comment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!rating) {
      rating = 0;
    }

    try {
      // First create a rating
      const newRating = new Rating({
        authorId: userId,
        sellerId, // Optional
        productId, // Optional
        rating,
      });

      const savedRating = await newRating.save();
      // Then create a comment with the new ratingId
      const newComment = new Comment({
        authorId: userId,
        sellerId, // Optional
        productId, // Optional
        ratingId: savedRating._id,
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
    const { startDate, endDate, limit = 10, offset = 0 } = req.query;
    // const { userId: sellerId } = '1234567890abcdef12345679';
    const { userId: sellerId } = req.body;

    if (!sellerId) {
      return res.status(400).json({ error: 'Seller ID is required' });
    }

    const query = { sellerId };

    if (startDate) {
      query.created_at = { $gte: new Date(startDate) };
    }

    if (endDate) {
      query.created_at = { ...query.created_at, $lte: new Date(endDate) };
    }

    try {
      const comments = await Comment.find(query)
        .populate('productId')
        .populate('ratingId')
        .sort({ created_at: -1 })
        // eslint-disable-next-line radix
        .skip(parseInt(offset))
        // eslint-disable-next-line radix
        .limit(parseInt(limit));

      const totalCount = await Comment.countDocuments({ sellerId });

      res.status(200).json({
        totalComments: totalCount,
        comments,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default FeedbackController;
