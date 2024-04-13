import jwt from 'jsonwebtoken';

import config from '../config/config.js';

/**
 * Generates a JWT token for a given user ID.
 *
 * This utility function abstracts the common logic for generating various JWT tokens
 * such as access tokens, refresh tokens, and confirmation tokens. It takes the user ID,
 * a secret key, and an expiration time as parameters to return a signed JWT token.
 *
 * @param {string} userId - The unique identifier of the user for whom the token is generated.
 * @param {string} secretKey - The secret key used to sign the JWT token. Ensure this is secure.
 * @param {string|number} expiresIn - The validity period of the token, expressed in seconds or a string describing the time span.
 *
 * @returns {string} The generated JWT token.
 */
const generateToken = (userId, secretKey, expiresIn) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn });
};

/**
 * Generates an access token for a given user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 *
 * @returns {string} The generated access token.
 */
const generateAccessToken = (userId) => {
  return generateToken(userId, config.accessSecretKey, config.accessTokenTime);
};

/**
 * Generates a refresh token for a given user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 *
 * @returns {string} The generated refresh token.
 */
const generateRefreshToken = (userId) => {
  return generateToken(userId, config.refreshSecretKey, config.refreshTokenTime);
};

/**
 * Generates a confirmation token for a given user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 *
 * @returns {string} The generated confirmation token.
 */
const generateConfirmToken = (userId) => {
  return generateToken(userId, config.confirmSecretKey, config.confirmTokenTime);
};

export { generateAccessToken, generateRefreshToken, generateConfirmToken };
