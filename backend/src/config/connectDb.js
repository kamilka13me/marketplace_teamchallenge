// db.js
import mongoose from 'mongoose';
import config from './config.js';

const connectDb = async () => {
  try {
    await mongoose.connect(config.mongoURL + '/marketplace_teamchallenge');
    console.log(config.mongoURL + '/marketplace_teamchallenge');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('db connect error:', error);
    throw error;
  }
};

export default connectDb;
