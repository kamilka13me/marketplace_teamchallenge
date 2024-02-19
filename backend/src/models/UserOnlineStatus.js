/**
 * @swagger
 * components:
 *   schemas:
 *     UserOnlineStatus:
 *       type: object
 *       required:
 *         - userId
 *         - socketId
 *         - isOnline
 *         - lastOnline
 *       properties:
 *         userId:
 *           type: string
 *           description: Унікальний ідентифікатор користувача
 *         socketId:
 *           type: string
 *           description: Ідентифікатор сокета, через який користувач підключений
 *         isOnline:
 *           type: boolean
 *           description: Прапорець, що вказує чи є користувач онлайн
 *         lastOnline:
 *           type: string
 *           format: date-time
 *           description: Останній час, коли користувач був онлайн
 *       example:
 *         userId: "12345"
 *         socketId: "abcd1234"
 *         isOnline: true
 *         lastOnline: "2023-01-01T12:00:00.000Z"
 */

import mongoose from 'mongoose';

const userOnlineStatusSchema = new mongoose.Schema({
  userId: String,
  socketId: String,
  isOnline: Boolean,
  lastOnline: Date,
});

const UserOnlineStatus = mongoose.model('User_Online_Status', userOnlineStatusSchema);

export default UserOnlineStatus;
