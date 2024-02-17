module.exports = {
  apps: [
    {
      name: 'MT_start',
      script: 'server.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      min_uptime: '60s',
      max_restarts: 5,
      env_development: {
        NODE_ENV: 'development',
        watch: true,
        output: './logs/output.log',
        error: './logs/error.log',
      },
    },
    {
      name: 'MT_prod',
      script: 'server.js',
      min_uptime: '60s',
      max_restarts: 5,
      env_production: {
        NODE_ENV: 'production',
        output: './logs/output.log',
        error: './logs/error.log',
      },
    },
    {
      name: 'MT_dev',
      script: 'server.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      min_uptime: '60s',
      max_restarts: 1,
      env: {
        NODE_ENV: 'null',
        output: './logs/output.log',
        error: './logs/error.log',
      },
    },
  ],
};
