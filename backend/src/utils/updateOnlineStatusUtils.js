import UserOnlineStatus from '../models/UserOnlineStatus.js';

const updateOnlineStatus = async (userId, newSocketId, isOnlineNow) => {
  try {
    const updatedOrNewUser = await UserOnlineStatus.findOneAndUpdate(
      { userId },
      {
        socketId: newSocketId,
        isOnline: isOnlineNow,
        lastOnline: Date.now(),
      },
      { upsert: true, new: true, returnDocument: 'after' },
    );
  } catch (err) {
    console.error('error update online status', err);
  }
};

export default updateOnlineStatus;
