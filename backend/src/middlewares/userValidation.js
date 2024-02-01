import { body, validationResult } from 'express-validator';
import validator from 'validator';

const validateUser = (req, res, next) => {
  body('username')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters long')
    .custom((value) => {
      if (!validator.matches(value, /^[a-zA-Z0-9' ]+$/u)) {
        throw new Error(
          'Username can only contain alphanumeric characters, apostrophes, and spaces.',
        );
      }

      return true;
    })
    .customSanitizer((value) => value.trim())(req, res, () => {}); // Remove spaces at the beginning and end

  body('surname')
    .optional()
    .custom((value) => {
      if (!validator.matches(value, /^[a-zA-Z0-9' ]+$/u)) {
        throw new Error(
          'Surname can only contain alphanumeric characters, apostrophes, and spaces.',
        );
      }

      return true;
    })
    .customSanitizer((value) => value.trim())(req, res, () => {}); // Remove spaces at the beginning and end

  body('email').optional().isEmail().withMessage('Invalid email address')(
    req,
    res,
    () => {},
  );

  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^[a-zA-Z0-9@#$%]+$/)
    .withMessage('Password can only contain alphanumeric characters, @, #, $, %.')(
    req,
    res,
    () => {},
  );

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If the validation is successful, we move on to the next processing
  next();
};

export { validateUser };
