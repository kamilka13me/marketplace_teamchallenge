import mongoose from 'mongoose';

const { Schema } = mongoose;

const BrowserInfoSchema = new Schema({
  browser: {
    name: { type: String },
    version: { type: String },
  },
  os: {
    name: { type: String },
    version: { type: String },
    versionName: { type: String },
  },
  platform: {
    type: { type: String },
  },
  engine: {
    name: { type: String },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userIp: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const BrowserInfo = mongoose.model('Browser_info', BrowserInfoSchema);

export default BrowserInfo;
