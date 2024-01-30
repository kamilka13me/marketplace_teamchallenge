import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import swaggerDocs from './docs/swagger/swager.js';
import authRoute from './src/components/routes/authRoute.js';
import roleRoute from './src/components/routes/roleRoute.js';
import statusRoute from './src/components/routes/statusRoute.js';
import userRoute from './src/components/routes/userRoutes.js';
import config from './src/config/config.js';
import connectDb from './src/config/connectDb.js';
import errorLogger from './src/middlewares/errorLogger.js';
import jsonErrorHandler from './src/middlewares/jsonErrorHandler.js';

const app = express();

app.use(express.json());

app.use(errorLogger);

// JSON validator
app.use(jsonErrorHandler);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// mongo connect
connectDb();
//

//

// logs

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logsDirectory = path.join(__dirname, 'logs');

/* eslint-enable no-underscore-dangle */
// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}
const generalLogStream = fs.createWriteStream(path.join(logsDirectory, 'httpLogs.log'), {
  flags: 'a',
});
const detailedLogStream = fs.createWriteStream(
  path.join(logsDirectory, 'httpDetailedLog.log'),
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

//

//

// Routes

// Server status
app.use('/api/status', statusRoute);
app.use('/api/users', userRoute);
app.use('/api/roles', roleRoute);
app.use('/api/auth', authRoute);

const server = app.listen(config.port, async () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${config.port}`);

  swaggerDocs(app, config.port);
});

export default server;
