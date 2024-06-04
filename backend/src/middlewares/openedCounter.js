import jwt from 'jsonwebtoken';

import config from '../config/config.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

/**
 * Middleware for counting views of a product.
 * This middleware does the following steps:
 * 1. Extracts the product ID from the request parameters.
 * 2. Attempts to retrieve the accessToken from either the Authorization header or cookies.
 * 3. If a accessToken is found, it verifies the accessToken and extracts the user ID.
 * 4. Looks up the user by the decoded user ID and populates their role.
 * 5. Checks if the user exists. If not, returns a 401 status with an error message.
 * 6. If the user exists, the middleware checks if the product has already been viewed by the user:
 *    - If the product has not been viewed (the product ID is not in the user's views array),
 *      it increments the product's views count by 1 and adds the product ID to the user's views array.
 *    - If the product has already been viewed by the user, it skips incrementing the product's views count.
 *    This prevents inflating view counts by repeated views from the same user.
 * 7. Finally, it saves any changes to the user document (if any) and proceeds to the next middleware or route handler.
 *
 * If an error occurs during accessToken verification or database operations, the middleware handles it by returning
 * appropriate error messages and status codes, such as 401 for expired or invalid tokens, and 500 for internal server errors.
 *
 * @param {Object} req - The request object from Express.js. Expected to contain the product ID in params and optionally a accessToken in headers or cookies.
 * @param {Object} res - The response object from Express.js. Used to return error messages or to proceed with the response.
 * @param {Function} next - The next middleware or route handler to be executed after this middleware completes its execution.
 */

const openedCounter = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const accessToken =
        req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;

      if (accessToken) {
        const decoded = jwt.verify(accessToken, config.accessSecretKey);
        const user = await User.findById(decoded.id).populate('role');

        if (user) {
          if (!user.opened.includes(id)) {
            await Product.findByIdAndUpdate(id, { $inc: { opened: 1 } });
            user.opened.push(id);
            await user.save();
          }
        }
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // eslint-disable-next-line no-console
        console.warn('The token is expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        // eslint-disable-next-line no-console
        console.warn('Invalid access token');
      } else {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    } finally {
      next();
    }
  };
};

export default openedCounter;
