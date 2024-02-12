// db.js
import mongoose from 'mongoose';

import config from './config.js';

const connectDb = async () => {
  try {
    await mongoose.connect(`${config.mongoURL}${config.mongoDB}`);
    // eslint-disable-next-line no-console
    console.log(`${config.mongoURL}${config.mongoDB}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('db connect error:', error);
    throw error;
  }
};

export default connectDb;
