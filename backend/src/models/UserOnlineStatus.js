import mongoose from 'mongoose';

const userOnlineStatusSchema = new mongoose.Schema({
  userId: String,
  socketId: String,
  isOnline: Boolean,
  lastOnline: Date,
});

const UserOnlineStatus = mongoose.model('User_Online_Status', userOnlineStatusSchema);

export default UserOnlineStatus;
