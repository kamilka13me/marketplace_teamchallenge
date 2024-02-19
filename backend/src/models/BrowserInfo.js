import mongoose from 'mongoose';
/**
 * @swagger
 * components:
 *   schemas:
 *     BrowserInfo:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         browser:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the browser
 *             version:
 *               type: string
 *               description: Version of the browser
 *         os:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Operating system name
 *             version:
 *               type: string
 *               description: Operating system version
 *             versionName:
 *               type: string
 *               description: Human-readable name of the operating system version
 *         platform:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               description: Platform type (e.g., desktop, mobile)
 *         engine:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Browser's layout engine
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time when the info was recorded
 *         userIp:
 *           type: string
 *           description: IP address of the user
 *         userId:
 *           type: string
 *           format: uuid
 *           description: Unique identifier of the user
 *       example:
 *         browser:
 *           name: Chrome
 *           version: '89.0.4389.82'
 *         os:
 *           name: Windows
 *           version: '10'
 *           versionName: 'Redstone'
 *         platform:
 *           type: Desktop
 *         engine:
 *           name: Blink
 *         date: '2021-03-17T03:24:00'
 *         userIp: '192.168.1.1'
 *         userId: '507f1f77bcf86cd799439011'
 */

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
