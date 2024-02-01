import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const errorLogger = (err, req, res, next) => {
  //  Formatting an error message
  const errorMessage = `[${new Date().toISOString()}] Error: ${err.message}\n`;

  /* eslint-disable no-underscore-dangle */
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const logsDirectory = path.join(__dirname, '..', '..', 'logs');
  /* eslint-enable no-underscore-dangle */

  // Determine the path to the log file
  const logFilePath = path.join(logsDirectory, 'errorLog.log');

  // Write the error to a file
  fs.appendFile(logFilePath, errorMessage, (writeErr) => {
    if (writeErr) {
      // eslint-disable-next-line no-console
      console.error('Error writing to log file:', writeErr);
    }
  });

  next(err);
};

export default errorLogger;
