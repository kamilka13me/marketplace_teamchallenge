import mongoose from 'mongoose';

const loginAttemptsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  lastTry: {
    type: Date,
    default: Date.now,
  },
});

const LoginAttempts = mongoose.model('Login_Attempts', loginAttemptsSchema);

export default LoginAttempts;
