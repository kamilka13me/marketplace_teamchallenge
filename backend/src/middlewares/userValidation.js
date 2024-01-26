// validationMiddleware.js
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
    .customSanitizer((value) => value.trim())(req, res, () => {}); // Прибрати пробіли на початку та кінці

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
    .customSanitizer((value) => value.trim())(req, res, () => {}); // Прибрати пробіли на початку та кінці

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

  // Якщо валідація успішна, переходимо до наступної обробки
  next();
};

export { validateUser };
