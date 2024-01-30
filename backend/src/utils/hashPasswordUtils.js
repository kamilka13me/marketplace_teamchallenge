import bcrypt from 'bcrypt';

/**
 * Hashing password.
 * @param {string} password - The plain text password to hash.
 * @param {number} [saltRounds=10] - The number of rounds of salting (optional, default is 10).
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 * @example
 * // Import the hashPassword function
 * import hashPassword from './hashPassword.js';
 *
 * (async () => {
 *   try {
 *     const plainPassword = 'myPlainPassword';
 *
 *     // Hashing the password
 *     const hashedPassword = await hashPassword(plainPassword);
 *
 *   } catch (error) {
 *     console.error('Error hashing password:', error);
 *   }
 * }
 */
const hashPassword = async (password, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export default hashPassword;
