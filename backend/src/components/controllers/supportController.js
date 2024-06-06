import mongoose from 'mongoose';

import Comment from '../../models/Comment.js';
import Complaint from '../../models/Complaint.js';
import Support from '../../models/Support.js';
import User from '../../models/User.js';

const supportController = {
  sendForm: async (req, res) => {
    try {
      const { topic, content, userId } = req.body;
      let { images } = req.body;

      images = images.map((name) => `/static/support/${name}`);
      const message = {
        userId,
        topic,
        content,
        images,
      };
      const newMessage = new Support(message);
      const saveMessage = await newMessage.save();

      res.status(201).json({ message: 'message created', content: saveMessage });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'server error', error });
    }
  },

  // get
  getSupport: async (req, res) => {
    try {
      const { startDate, endDate, status, limit, offset = 0, search } = req.query;
      const query = {};

      if (startDate) {
        query.createdAt = { $gte: new Date(startDate) };
      }

      if (endDate) {
        if (!query.createdAt) {
          query.createdAt = {};
        }
        query.createdAt.$lte = new Date(endDate);
      }

      if (status) {
        query.status = status;
      }

      if (search) {
        // Check if search is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(search)) {
          query._id = search; // Search by support ID if search is a valid ObjectId
        } else {
          // Searching the user collection for a partial match in the username and email fields
          const users = await User.find({
            $or: [
              { username: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
            ],
          });

          // Create an array of userIds from the IDs of the found users
          const userIds = users.map((user) => user._id);

          if (userIds.length > 0) {
            query.userId = { $in: userIds };
          } else {
            return res.status(200).json([]);
          }
        }
      }

      // Get total count of documents matching the query
      const totalCount = await Support.countDocuments(query);

      const messages = await Support.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('userId');

      const supportMessage = messages.map((item) => ({
        userId: item.userId._id.toString(),
        userMail: item.userId.email,
        topic: item.topic,
        content: item.content,
        images: item.images,
        date: new Date(item.createdAt).toISOString(),
        status: item.status,
        _id: item._id,
      }));

      res.status(200).json({ totalCount, supportMessage });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error fetching support messages:', error);
      res.status(500).json({ message: 'server error' });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Check if the status is valid
      if (!['new', 'consider', 'work', 'closed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const support = await Support.findById(id);

      if (!support) {
        return res.status(404).json({ message: 'Support not found' });
      }

      support.status = status;
      await support.save();

      res.status(200).json({ message: 'Support status updated successfully' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error updating support status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createComplaint: async (req, res) => {
    try {
      const { commentId, reason } = req.body;

      // Перевіряємо чи commentId та reason присутні
      if (!commentId || ![0, 1, 2, 3, 4, 5].includes(reason)) {
        return res.status(400).json({ message: 'Некоректні дані' });
      }

      // Перевіряємо чи коментар існує
      // console.log(commentId);
      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({ message: 'Коментар не знайдено' });
      }

      // Створюємо нове оскарження
      const complaint = new Complaint({ commentId, reason });

      await complaint.save();

      res.status(201).json({ message: 'Оскарження збережено успішно' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },
};

export default supportController;
