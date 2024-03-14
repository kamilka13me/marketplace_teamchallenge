import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import config from '../config/config.js';
import Role from '../models/Role.js';
import User from '../models/User.js';

const { ObjectId } = mongoose.Types;

/**
 * Middleware to check if the user has permission to perform a specific action.
 * It checks the user's role and the associated permissions.
 *
 * @param {string} action - The action to which the permission is required.
 * @example router.get('/', checkPermission("action"), action);
 */
const checkPermission = (action) => {
  return async (req, res, next) => {
    try {
      const paramId = req.params.id;
      const tokenHeaders = req.headers.authorization?.split(' ')[1];
      const tokenCoockies = req.cookies.accessToken;
      let accessToken;

      if (tokenHeaders) {
        accessToken = tokenHeaders;
      } else if (tokenCoockies) {
        accessToken = tokenCoockies;
      }

      let hasPermission;

      if (tokenHeaders || tokenCoockies) {
        const decoded = jwt.verify(accessToken, config.accessSecretKey);

        const user = await User.findById(decoded.id).populate('role');

        // eslint-disable-next-line no-param-reassign
        req.body.userId = decoded.id;

        if (!user) {
          return res.status(401).json({ message: 'Access denied. User not found.' });
        }
        if (new ObjectId(user._id).equals(paramId)) {
          hasPermission = true;
        } else {
          hasPermission = user.role.permissions.includes(action);
        }
      } else {
        const role = await Role.findOne({ name: 'notLoginUser' });

        hasPermission = role.permissions.includes(action);
      }

      if (!hasPermission) {
        return res.status(403).json({
          message: 'Access denied. You do not have permission to perform this action.',
        });
      }

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).send('Token expired');
      } else {
        // eslint-disable-next-line no-console
        console.error(error);

        return res.status(500).send('Internal Server Error');
      }
    }
  };
};

export default checkPermission;
