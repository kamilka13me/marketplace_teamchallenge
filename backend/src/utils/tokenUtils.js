import jwt from 'jsonwebtoken';

import config from '../config/config.js';

/**
 * generate jwt acessToken
 * @param {string} userId
 *
 * @example
 * import generateAccessToken from "path/tokenUtils.js"
 * const acessToken = generateAccessToken(userId);
 */
const generateAccessToken = (userId) => {
  const { accessSecretKey } = config;
  const acessToken = jwt.sign({ id: userId }, accessSecretKey, {
    expiresIn: `${config.accessTokenTime}`,
  });

  return acessToken;
};

/**
 * generate jwt refreshToken
 * @param {string} userId
 *
 * @example
 * import generateRefreshToken from "path/tokenUtils.js"
 * const acessToken = generateRefreshToken(userId);
 */
const generateRefreshToken = (userId) => {
  const { refreshSecretKey } = config;
  const refreshToken = jwt.sign({ id: userId }, refreshSecretKey, {
    expiresIn: `${config.refreshTokenTime}`,
    // expiresIn: `-1h`,
  });

  return refreshToken;
};

/**
 * generate jwt confirmToken
 * @param {string} userId
 *
 * @example
 * import generateConfirmToken from "path/tokenUtils.js"
 * const confirmToken = generateRefreshToken(userId);
 */
const generateConfirmToken = (userId) => {
  const { confirmSecretKey } = config;
  const confirmToken = jwt.sign({ id: userId }, confirmSecretKey, {
    expiresIn: `${config.confirmTokenTime}`,
    // expiresIn: `-1h`,
  });

  return confirmToken;
};

export { generateAccessToken, generateRefreshToken, generateConfirmToken };
