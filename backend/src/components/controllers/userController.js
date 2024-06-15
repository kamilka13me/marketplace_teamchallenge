import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import config from '../../config/config.js';
import BrowserInfo from '../../models/BrowserInfo.js';
import PasswordRecoverTokens from '../../models/PasswordRecoveryToken.js';
import Role from '../../models/Role.js';
import User from '../../models/User.js';
import sendMail from '../../services/nodemailer/nodemailer.js';
import hashPassword from '../../utils/hashPasswordUtils.js';
import {
  generateAccessToken,
  generateConfirmToken,
  generateRefreshToken,
} from '../../utils/tokenUtils.js';

const userController = {
  // create user

  createUser: async (req, res) => {
    try {
      const { username, surname, email, password, info } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const regex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).{9,}$/;

      if (!regex.test(password)) {
        return res.status(400).json({ error: 'invalid password' });
      }

      const role = await Role.findOne({ name: 'user' });

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
        role: 'user',
        dob: user.dob || null,
        isAccountConfirm: user.isAccountConfirm,
        phoneNumber: user.phoneNumber || null,
        wishlist: user.wishlist,
      };

      const accessToken = generateAccessToken(user._id);

      const newBrowserInfo = new BrowserInfo({
        ...info,
        userId: user._id,
      });

      newBrowserInfo.save();

      const refreshToken = generateRefreshToken(user._id);

      const confirmToken = generateConfirmToken(user._id);

      sendMail(user.email, 'register', confirmToken);
      // res.cookie('accessToken', accessToken, { httpOnly: false, secure: false });
      // res.cookie('user', JSON.stringify(userCallback), {httpOnly: false,secure: false,});
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
      res
        .status(201)
        .json({ message: 'User created successfully', user: userCallback, accessToken });
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

  // get user

  getUser: async (req, res) => {
    try {
      const userId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      // find in db by id
      const user = await User.findById(userId).populate('role');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // user callback
      const userCallback = {
        _id: user._id,
        username: user.username || null,
        surname: user.surname || null,
        email: user.email,
        role: user.role.name,
        dob: user.dob || null,
        isAccountConfirm: user.isAccountConfirm,
        phoneNumber: user.phoneNumber || null,
        wishlist: user.wishlist,
      };

      res.status(200).json({ message: 'User get successfully.', user: userCallback });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      let { limit = 10, sortDirection = 1, offset = 0 } = req.query;
      const {
        search,
        isAccountActive,
        isAccountConfirm,

        sortBy = '_id',
        role,
        startDate,
        endDate,
      } = req.query;

      limit = parseInt(limit, 10);
      offset = parseInt(offset, 10);
      sortDirection = parseInt(sortDirection, 10);

      const query = {};

      if (search) {
        // Check if search is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(search)) {
          query._id = search; // Search by user ID if search is a valid ObjectId
        } else {
          query.$or = [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phoneNumber: { $regex: search, $options: 'i' } },
            { surname: { $regex: search, $options: 'i' } },
          ];
        }
      }

      if (isAccountActive !== undefined) {
        query.isAccountActive = isAccountActive === 'true';
      }

      if (isAccountConfirm !== undefined) {
        query.isAccountConfirm = isAccountConfirm === 'true';
      }

      if (role) {
        const userRole = await Role.findOne({ name: { $regex: role } });

        if (userRole) {
          query.role = userRole._id;
        } else {
          return res.status(200).json({ users: [], totalCount: 0 });
        }
      }

      if (startDate || endDate) {
        query.created_at = {};
        if (startDate) {
          query.created_at.$gte = new Date(startDate);
        }
        if (endDate) {
          query.created_at.$lte = new Date(endDate);
        }
      }

      const users = await User.find(query)
        .skip(offset)
        .limit(limit)
        .sort({ [sortBy]: sortDirection })
        .select('-password -__v -views -opened -wishlist')
        .populate({ path: 'role', select: 'name' });

      const totalCount = await User.countDocuments(query);

      const usersWithBrowserInfo = await Promise.all(
        users.map(async (user) => {
          const browserInfo = await BrowserInfo.findOne({ userId: user._id }).select(
            'date',
          );

          return {
            ...user.toObject(),
            activity: browserInfo || null,
          };
        }),
      );

      res.status(200).json({
        totalCount,
        users: usersWithBrowserInfo,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).send('Server error');
    }
  },

  // delte user

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send({ message: 'User deleted successfully.' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send({ message: 'Error deleting user' });
    }
  },

  updateUser: async (req, res) => {
    const { userId, username, surname, dob, phoneNumber } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, surname, dob, phoneNumber },
        { new: true, runValidators: true },
      ).populate('role');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const userCallback = {
        _id: updatedUser._id,
        username: updatedUser.username,
        surname: updatedUser.surname,
        email: updatedUser.email,
        role: updatedUser.role.name,
        dob: updatedUser.dob,
        isAccountConfirm: updatedUser.isAccountConfirm,
        phoneNumber: updatedUser.phoneNumber,
        wishlist: updatedUser.wishlist,
      };

      res.status(200).json({
        message: 'User updated successfully.',
        user: userCallback,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Error updating user.', error: error.message });
    }
  },

  updatePassword: async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare old password

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }

      // Hash new password
      const hashedPassword = await hashPassword(newPassword);

      // Update user password
      user.password = hashedPassword;
      await user.save();

      const userCallback = {
        _id: user._id,
        username: user.username,
        surname: user.surname,
        email: user.email,
        role: user.role.name,
        dob: user.dob,
        isAccountConfirm: user.isAccountConfirm,
        phoneNumber: user.phoneNumber,
      };

      res
        .status(200)
        .json({ message: 'Password updated successfully.', user: userCallback });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Error updating password' });
    }
  },

  recoverPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: 'User not found with this email address.' });
      }
      const confirmToken = generateConfirmToken(user._id);

      const filter = { userId: user._id };
      const update = { $set: { token: confirmToken } };
      const options = { upsert: true };

      await PasswordRecoverTokens.updateOne(filter, update, options);

      sendMail(user.email, 'recovery', confirmToken);
      res
        .status(200)
        .json({ message: 'The password recovery email was sent successfully.' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Error recovering password' });
    }
  },

  recoverPasswordConfirm: async (req, res) => {
    try {
      const { confirmToken, newPassword } = req.body;

      if (!confirmToken) {
        return res.status(400).json({ message: 'Token is required' });
      }
      const decoded = jwt.verify(confirmToken, config.confirmSecretKey);

      const BaseToken = PasswordRecoverTokens.findOne(
        { userId: decoded.id },
        { token: confirmToken },
      );

      if (!BaseToken) {
        return res.status(419).json({ message: 'Token expired' });
      }

      const hashedPassword = await hashPassword(newPassword);

      const updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        { isAccountConfirm: true, password: hashedPassword },
        { new: true, runValidators: true },
      ).populate('role');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const userCallback = {
        _id: updatedUser._id,
        username: updatedUser.username,
        surname: updatedUser.surname,
        email: updatedUser.email,
        role: updatedUser.role.name,
        dob: updatedUser.dob,
        isAccountConfirm: updatedUser.isAccountConfirm,
        phoneNumber: updatedUser.phoneNumber,
        wishlist: updatedUser.wishlist,
      };

      await PasswordRecoverTokens.deleteOne(BaseToken);

      return res.status(200).json({
        message: 'User verify successfully.',
        user: userCallback,
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(419).json({ message: 'Token expired' });
      } else {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ message: 'Unexpected error' });
      }
    }
  },

  sendConfirmMail: async (req, res) => {
    try {
      const { userId } = req.body;

      const user = await User.findById(userId);
      const confirmToken = generateConfirmToken(user._id);

      sendMail(user.email, 'register', confirmToken);

      return res.status(200).json({
        message: 'mail send successfully.',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Unexpected error' });
    }
  },

  updateAccountStatus: async (req, res) => {
    try {
      const { userId } = req.params;
      const { accountStatus } = req.body;

      // Update user status and return the updated user
      const user = await User.findByIdAndUpdate(
        userId,
        { accountStatus },
        { new: true, runValidators: true },
      ).populate('role');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Account status updated', user });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Unexpected error' });
    }
  },
};

export default userController;
