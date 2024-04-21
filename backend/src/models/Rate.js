import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  rating: {
    type: Number,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
