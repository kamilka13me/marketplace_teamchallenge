import mongoose from 'mongoose';
/**
 * Checks if the given ID is a valid MongoDB ObjectId.
 *
 * @param {string} id - The ID to be verified.
 * @returns {boolean} True if the ID is valid, false otherwise.
 * @example
 * isValidObjectId('507f1f77bcf86cd799439011'); // returns true
 * isValidObjectId('invalidId'); // returns false
 */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export { isValidObjectId };
