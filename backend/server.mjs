// server.mjs

import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from './src/config/config.mjs';
import swaggerUi from 'swagger-ui-express';
import statusRoute from './src/components/routes/statusRoute.mjs';
import path from 'path';
import specs from './docs/swagger/swager.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logsDirectory = path.join(__dirname, 'logs');

const app = express();

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// logs
const generalLogStream = fs.createWriteStream(path.join(logsDirectory, 'logs.txt'), { flags: 'a' });
const detailedLogStream = fs.createWriteStream(path.join(logsDirectory, 'detailedLogs.txt'), { flags: 'a' });

// Logging to logs.txt
app.use(morgan(':date status: :status to: :method :url from: :referrer', { stream: generalLogStream }));

// Logging to detailedLogs.txt
app.use(morgan('combined', { stream: detailedLogStream }));

// Routes
// Server status
app.use('/api/status', statusRoute);

// Swagger
app.use('/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

const server = app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

export default server;
