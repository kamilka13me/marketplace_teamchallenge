import jwt from 'jsonwebtoken';
import config from '../config/config.js'


/**  
 * generate jwt token
 * @param {string} userId
 * 
 * @example
 * import generateToken from "path/tokenUtils.js"
 * const token = generateToken(userId);
 */
const generateToken = (userId) => {
  const secretKey = config.secretKey;
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
  return token;
};

export default generateToken;