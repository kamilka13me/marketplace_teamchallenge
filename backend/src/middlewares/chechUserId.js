import jwt from 'jsonwebtoken';

import config from '../config/config.js';
import Role from '../models/Role.js';
import User from '../models/User.js';

/**
 * Middleware to check user id.
 * It checks the user's id and the put it to req.
 *
 * @param {string} action - The action to which the permission is required.
 * @example router.get('/', checkId, action);
 */
const idToReq = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }

      const decoded = jwt.verify(token, config.secretKey);
      const user = await User.findById(decoded.id).populate('role');

      if (!user) {
        return res.status(401).json({ message: 'Access denied. User not found.' });
      }
      // eslint-disable-next-line no-param-reassign
      req.body.userId = decoded.id;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send('Token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).send('Invalid token');
      }
      // eslint-disable-next-line no-console
      console.error(error);

      return res.status(500).send('Internal Server Error');
    }
  };
};

export default idToReq;
