require('dotenv').config();
module.exports = {
  apps: [
    {
      name: 'MT_start',
      script: 'server.js',
      watch: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      ignore_watch: ['node_modules', 'logs', 'public'],
      min_uptime: '60s',
      max_restarts: 5,
      output: './logs/output.log',
      error: './logs/error.log',
      env: {
        NODE_ENV: 'development',
        MAILER_USER: process.env.MAILER_USER,
        MAILER_PASS: process.env.MAILER_PASS,
      },
    },
    {
      name: 'MT_prod',
      script: 'server.js',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      min_uptime: '60s',
      max_restarts: 5,
      env: {
        NODE_ENV: 'production',
        MAILER_USER: process.env.MAILER_USER,
        MAILER_PASS: process.env.MAILER_PASS,
        output: './logs/output.log',
        error: './logs/error.log',
      },
    },
    {
      name: 'MT_dev',
      script: 'server.js',
      watch: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      ignore_watch: ['node_modules', 'logs', 'public'],
      min_uptime: '60s',
      max_restarts: 1,
      env: {
        NODE_ENV: 'null',
        MAILER_USER: process.env.MAILER_USER,
        MAILER_PASS: process.env.MAILER_PASS,
        output: './logs/output.log',
        error: './logs/error.log',
      },
    },
  ],
};
