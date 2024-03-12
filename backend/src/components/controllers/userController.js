import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import BrowserInfo from '../../models/BrowserInfo.js';
import Role from '../../models/Role.js';
import User from '../../models/User.js';
import sendMail from '../../services/nodemailer/nodemailer.js';
import hashPassword from '../../utils/hashPasswordUtils.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/tokenUtils.js';

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
        username: user.username,
        surname: user.username,
        email: user.email,
        role: 'user',
        wishlist: user.wishlist,
      };

      const accessToken = generateAccessToken(user._id);

      const newBrowserInfo = new BrowserInfo({
        ...info,
        userId: user._id,
      });

      newBrowserInfo.save();

      const refreshToken = generateRefreshToken(user._id);

      sendMail(user.email, 'register', refreshToken);
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
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // user callback
      const userCallback = {
        _id: user._id,
        username: user.username,
        surname: user.username,
        email: user.email,
        role: 'user',
        wishlist: user.wishlist,
      };

      res.status(200).json({ user: userCallback });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // get all user

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).select('-password -__v');

      res.json({ users });
    } catch (error) {
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

      res.status(200).send({ message: 'User deleted successfully' });
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
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.status(200).json({
        message: 'User updated successfully.',
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
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

      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating password' });
    }
  },
};

export default userController;
