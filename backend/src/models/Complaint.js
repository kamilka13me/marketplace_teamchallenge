import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  },
  reason: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, null],
    required: false,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
