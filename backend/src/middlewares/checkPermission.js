import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import config from '../config/config.js';

const checkPermission = (action) => {
  return async (req, res, next) => {
    try {
      const tokenHeaders = req.headers.authorization?.split(' ')[1];
      const tokenCoockies = req.cookies.token;
      let token;
      if (tokenHeaders) {
        token = tokenHeaders;
      } else if (tokenCoockies) {
        token = tokenCoockies;
      } else {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }

      const decoded = jwt.verify(token, config.secretKey);

      const user = await User.findById(decoded.id).populate('role');
      console.log(user.role.name);

      if (!user) {
        return res.status(401).json({ message: 'Access denied. User not found.' });
      }

      const hasPermission = user.role.permissions.includes(action);
      if (!hasPermission) {
        return res.status(403).json({
          message: 'Access denied. You do not have permission to perform this action.',
        });
      }

      req.user = user; // Optionally set user data to request object
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
};

export default checkPermission;

// const checkPermission = (action) => {
//   return async (req, res, next) => {
//     try {
//       // Переконуємося, що об'єкт user існує в req
//       if (!req.user) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }

//       const userId = req.user._id;

//       // Знайти користувача та його роль в базі даних
//       const user = await User.findById(userId).populate('role');

//       // Перевірити чи роль містить дану дію
//       if (user && user.role && user.role.permissions.includes(action)) {
//         next();
//       } else {
//         res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };
// };
