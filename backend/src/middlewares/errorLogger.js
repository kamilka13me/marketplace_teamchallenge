import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const errorLogger = (err, req, res, next) => {
  // Форматуємо повідомлення про помилку
  const errorMessage = `[${new Date().toISOString()}] Error: ${err.message}\n`;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const logsDirectory = path.join(__dirname, '..', '..', 'logs');
    console.log(logsDirectory);
  // Визначаємо шлях до файлу з логами
  const logFilePath = path.join(logsDirectory, 'errorLog.log');

  // Записуємо помилку у файл
  fs.appendFile(logFilePath, errorMessage, (writeErr) => {
    if (writeErr) {
      console.error('Error writing to log file:', writeErr);
    }
  });

  // Передаємо обробку помилки далі
  next(err);
};

export default errorLogger;
