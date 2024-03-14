import fs from 'fs';
import { createServer } from 'https';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';

import swaggerDocs from './docs/swagger/swager.js';
import authRoute from './src/components/routes/authRoute.js';
import categoryRoute from './src/components/routes/categoryRoute.js';
import controlPanelRoute from './src/components/routes/controlPanelRoute.js';
import onlineStatusRoute from './src/components/routes/onlineStatusRoute.js';
import productRoute from './src/components/routes/productRoute.js';
import roleRoute from './src/components/routes/roleRoute.js';
import statusRoute from './src/components/routes/statusRoute.js';
import userRoute from './src/components/routes/userRoutes.js';
import wishlistRoute from './src/components/routes/wishlistRoute.js';
import config from './src/config/config.js';
import connectDb from './src/config/connectDb.js';
import errorLogger from './src/middlewares/errorLogger.js';
import jsonErrorHandler from './src/middlewares/jsonErrorHandler.js';
import setupSocket from './src/services/socketService/socket.js';

dotenv.config();

const app = express();

// app cors
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }),
);

const options = {
  key: fs.readFileSync('cerbot/privkey.pem'), // Change Private Key Path here
  cert: fs.readFileSync('cerbot/cert.pem'), // Change Main Certificate Path here
  ca: fs.readFileSync('cerbot/fullchain.pem'), // Change Intermediate Certificate Path here
};

const server = createServer(options, app);

setupSocket(server);

app.use(express.json()); // check dubl !!!

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
const __dirname = dirname(fileURLToPath(import.meta.url));
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
app.use('/api/online-status', onlineStatusRoute);
app.use('/api/products', productRoute);
app.use('/api/category', categoryRoute);
app.use('/api/control-panel', controlPanelRoute);
app.use('/api/wishlist', wishlistRoute);

app.use('/static/products', express.static(path.join(__dirname, 'public/uploads')));
app.use('/static/banners', express.static(path.join(__dirname, 'public/banners')));
app.use('/static/category', express.static(path.join(__dirname, 'public/category')));

server.listen(config.port, async () => {
  // eslint-disable-next-line no-console
  console.log('\n\n\n\n\n');
  // eslint-disable-next-line no-console
  console.log(`Server is running on https://localhost:${config.port}`);

  swaggerDocs(app, config.port);
});

export default server;
