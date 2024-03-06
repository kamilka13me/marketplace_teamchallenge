import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../config/config.js';
import BrowserInfo from '../../models/BrowserInfo.js';
import User from '../../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/tokenUtils.js';

const authController = {
  login: async (req, res) => {
    try {
      const { email, password, info } = req.body;
      const userIp = req.ip;
      const user = await User.findOne({ email }).populate('role');

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const userCallback = {
        _id: user._id,
        username: user.username,
        surname: user.username,
        email: user.email,
        role: user.role.name,
      };

      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      const newBrowserInfo = new BrowserInfo({
        ...info,
        userIp,
        userId: user._id,
      });

      newBrowserInfo.save();

      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

      return res
        .status(200)
        .json({ message: 'Auth success.', user: userCallback, accessToken });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: async (req, res) => {
    res.cookie('refreshToken', '', { expires: new Date(0) });

    res.status(200).send('Logged out successfully.');
  },

  setToken: async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send('Token is required');
    }

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    return res.send('Token has been set in cookies');
  },

  // refresh token
  refreshTokens: async (req, res) => {
    try {
      let { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(400).json({ message: 'Token is required' });
      }
      const decoded = jwt.verify(refreshToken, config.refreshSecretKey);

      const accessToken = generateAccessToken(decoded.id);

      refreshToken = generateRefreshToken(decoded.id);
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

      return res.status(200).json({ message: 'Token has been updated', accessToken });
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
};

export default authController;
