import mongoose from 'mongoose';

const PasswordRecoverTokensSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  token: {
    type: String,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const PasswordRecoverTokens = mongoose.model(
  'PasswordRecoverTokens',
  PasswordRecoverTokensSchema,
);

export default PasswordRecoverTokens;
