// server.mjs

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import morgan from 'morgan';

import swaggerDocs from './docs/swagger/swager.js';
import statusRoute from './src/components/routes/statusRoute.js';
import config from './src/config/config.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logsDirectory = path.join(__dirname, 'logs');
/* eslint-enable no-underscore-dangle */

const app = express();

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// logs
const generalLogStream = fs.createWriteStream(path.join(logsDirectory, 'logs.txt'), {
  flags: 'a',
});
const detailedLogStream = fs.createWriteStream(
  path.join(logsDirectory, 'detailedLogs.txt'),
  { flags: 'a' },
);

// Logging to logs.txt
app.use(
  morgan(':date status: :status to: :method :url from: :referrer', {
    stream: generalLogStream,
  }),
);

// Logging to detailedLogs.txt
app.use(morgan('combined', { stream: detailedLogStream }));

// Routes
// Server status
app.use('/api/status', statusRoute);

const server = app.listen(config.port, async () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${config.port}`);

  swaggerDocs(app, config.port);
});

export default server;
