import jwt from 'jsonwebtoken';
import config from '../config/config.js'

const generateToken = (userId) => {
  const secretKey = config.secretKey;
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
  return token;
};

export default generateToken;