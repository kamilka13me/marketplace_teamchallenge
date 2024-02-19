import fs from 'fs';
import path from 'path';

import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Checking the existence of a directory and creating it
const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setting the save directory
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    // Generate a unique file name
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);

    callback(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, callback) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
  } else {
    callback(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Middleware for adding file names to req.body.images
const appendFileNamesToBody = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    // eslint-disable-next-line no-param-reassign
    req.body.images = req.files.map((file) => file.filename);
  } else {
    // eslint-disable-next-line no-param-reassign
    req.body.images = []; // If there are no files, just initialise with an empty array
  }
  next();
};

export { upload, appendFileNamesToBody };
