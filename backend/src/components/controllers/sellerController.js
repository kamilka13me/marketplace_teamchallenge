import mongoose, { isValidObjectId } from 'mongoose';

import BrowserInfo from '../../models/BrowserInfo.js';
import Product from '../../models/Product.js';
import Role from '../../models/Role.js';
import Seller from '../../models/SellerInfo.js';
import User from '../../models/User.js';
import sendMail from '../../services/nodemailer/nodemailer.js';
import findChildCategories from '../../utils/findChildCategories.js';
import hashPassword from '../../utils/hashPasswordUtils.js';
import {
  generateAccessToken,
  generateConfirmToken,
  generateRefreshToken,
} from '../../utils/tokenUtils.js';

const sellerController = {
  createSeller: async (req, res) => {
    try {
      const {
        username,
        surname,
        email,
        password,
        info,
        legalName,
        legalAddress,
        city,
        cityIndex,
        communication,
        condition,
        contacts,
        descriptCompany,
        emailAdvertisement,
        emailAdvice,
        emailMessage,
        generalCommunication,
        generalName,
        idStateRegister,
        identificNumber,
        tax,
      } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const regex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).{9,}$/;

      if (!regex.test(password)) {
        return res.status(400).json({ error: 'invalid password' });
      }

      const role = await Role.findOne({ name: 'seller' });

      const userData = {};

      if (username) userData.username = username;
      if (surname) userData.surname = surname;
      if (email) userData.email = email;
      if (password) {
        const hashedPassword = await hashPassword(password);

        userData.password = hashedPassword;
      }

      userData.role = role._id;

      const newUser = new User(userData);
      const savedUser = await newUser.save();
      const user = savedUser.toObject();

      // user callback
      const userCallback = {
        _id: user._id,
        username: user.username || null,
        surname: user.surname || null,
        email: user.email,
        role: 'seler',
        dob: user.dob || null,
        isAccountConfirm: user.isAccountConfirm,
        isAccountActive: false,
        phoneNumber: user.phoneNumber || null,
        wishlist: user.wishlist,
      };

      const newSellerInfo = new Seller({
        sellerId: user._id,
        legalName,
        legalAddress,
        city,
        cityIndex,
        communication,
        condition,
        contacts,
        descriptCompany,
        emailAdvertisement,
        emailAdvice,
        emailMessage,
        generalCommunication,
        generalName,
        idStateRegister,
        identificNumber,
        tax,
      });

      await newSellerInfo.save();

      const accessToken = generateAccessToken(user._id);

      if (info) {
        const newBrowserInfo = new BrowserInfo({
          ...info,
          userId: user._id,
        });

        newBrowserInfo.save();
      }
      const refreshToken = generateRefreshToken(user._id);

      const confirmToken = generateConfirmToken(user._id);

      sendMail(user.email, 'register', confirmToken);
      // res.cookie('accessToken', accessToken, { httpOnly: false, secure: false });
      // res.cookie('user', JSON.stringify(userCallback), {httpOnly: false,secure: false,});
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
      res.status(201).json({
        message: 'Seller created successfully',
        seller: userCallback,
        accessToken,
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: 'user with this email allready exist' });
      } else {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  },
  getSellers: async (req, res) => {
    let { sortDirection = 1, limit = 10, offset = 0 } = req.query;
    const { startDate, endDate, search } = req.query;

    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);
    sortDirection = parseInt(sortDirection, 10) || 1;
    const query = {};

    try {
      if (startDate) {
        query.createdAt = { $gte: new Date(startDate) };
      }

      if (endDate) {
        if (!query.createdAt) {
          query.createdAt = {};
        }
        query.createdAt.$lte = new Date(endDate);
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
            query.sellerId = { $in: userIds };
          } else {
            return res.status(200).json([]);
          }
        }
      }

      const sellers = await Seller.find(query).populate({
        path: 'sellerId',
        select: 'username email isAccountConfirm isAccountActive',
      });

      res.status(200).json({ sellers });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send(error.message);
    }
  },

  // get all products
  getAllProducts: async (req, res) => {
    try {
      const {
        limit = 10,
        offset = 0,
        name,
        category,
        discount = 0,
        quantity = 1,
      } = req.query;
      let { sortBy, sortDirection } = req.query;

      const { userId } = req.body;

      // Building a filter object based on name and category
      const query = {};

      query.sellerId = userId;

      if (name) {
        query.name = { $regex: name, $options: 'i' }; // Search by name
      }
      if (category) {
        if (mongoose.Types.ObjectId.isValid(category)) {
          const categoryObjectId = new mongoose.Types.ObjectId(category);
          const categoryIds = [categoryObjectId];

          await findChildCategories(categoryObjectId, categoryIds);
          query.category = { $in: categoryIds.map((id) => id.toString()) };
        } else {
          query.category = category;
        }
      }

      // eslint-disable-next-line eqeqeq
      if (discount != 0) {
        query.discount = { $gt: discount - 1 };
      }
      // eslint-disable-next-line eqeqeq
      if (quantity != 0) {
        query.quantity = { $gt: quantity - 1 };
      }

      // Create a sorting object
      const sortObject = {};

      sortBy = sortBy || '_id';
      sortDirection = parseInt(sortDirection, 10) || 1;

      sortObject[sortBy] = sortDirection;

      // Retrieving products from the database
      const products = await Product.find(query)
        .sort(sortObject)
        .skip(offset)
        .limit(limit);
      const count = await Product.countDocuments({ sellerId: userId });

      res.status(200).json({ count, products });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send(error.message);
    }
  },

  // seller contacts
  getContacts: async (req, res) => {
    try {
      const { sellerId } = req.query;

      if (!sellerId) {
        res.status(400).json({ message: 'seller id is required' });
      }

      const seller = await Seller.findOne({ sellerId });

      res.status(200).json([{ contacts: seller.generalCommunication }]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send(error.message);
    }
  },

  getSellerInfo: async (req, res) => {
    const { sellerId } = req.query;

    try {
      const seller = await Seller.findOne({ sellerId });

      res.status(200).json(seller);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send(error.message);
    }
  },
  updateSellerInfo: async (req, res) => {
    const { userId } = req.body;
    const fieldsToUpdate = [
      'info',
      'legalName',
      'legalAddress',
      'city',
      'cityIndex',
      'communication',
      'condition',
      'contacts',
      'descriptCompany',
      'emailAdvertisement',
      'emailAdvice',
      'emailMessage',
      'generalCommunication',
      'generalName',
      'idStateRegister',
      'identificNumber',
      'tax',
    ];

    try {
      const filter = { sellerId: userId };

      const update = {
        $set: fieldsToUpdate.reduce((acc, key) => {
          if (req.body[key] !== undefined) {
            return { ...acc, [key]: req.body[key] }; // створюємо новий об'єкт замість зміни існуючого
          }

          return acc;
        }, {}),
      };

      const options = { new: true };
      const updatedSeller = await Seller.findOneAndUpdate(filter, update, options);

      res.status(201).send(updatedSeller);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send(error.message);
    }
  },
  updateSubscribe: async (req, res) => {
    try {
      const { sellerId } = req.params;
      const { subscribe } = req.body;

      // Check if the status is valid

      const seller = await Seller.findOne({ sellerId });

      if (!seller) {
        return res.status(404).json({ message: 'seller not found' });
      }

      seller.subscribe = subscribe;
      await seller.save();

      res.status(200).json({ message: 'seller status updated successfully' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error updating seller status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateSubscribeReq: async (req, res) => {
    try {
      const { sellerId } = req.params;
      const { subscribe } = req.body;

      const seller = await User.findById(sellerId);

      if (!seller) {
        return res.status(404).json({ message: 'seller not found' });
      }

      const data = {
        _id: seller._id,
        subscribe,
        email: seller.email,
        username: seller.username,
      };

      sendMail('13032004clash@gmail.com', 'subscribe', '', data);
      res.status(200).json({ message: 'seller status update req send successfully' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error updating seller status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

export default sellerController;
