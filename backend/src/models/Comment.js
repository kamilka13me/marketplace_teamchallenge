import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  comment: {
    type: String,
    require: true,
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
