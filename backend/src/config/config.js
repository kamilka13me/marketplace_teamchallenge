/* eslint-disable import/no-mutable-exports */

const environment = process.env.NODE_ENV;

let config;

if (environment === 'development') {
  config = {
    port: process.env.PORT || '3001',
    accessSecretKey: process.env.ACCESS_SECRET_KEY || 'Ex0YCKL2bcfnwWtCpqLXYqNqqzgbBxw4',
    refreshSecretKey:
      process.env.REFRESH_SECRET_KEY ||
      'e5e4e8c11f75a835ee6435d29c0b99639c2bcda5ac2ccedb49dadee2ca3f8b9a',
    confirmSecretKey:
      process.env.CONFIRM_SECRET_KEY ||
      '5e30285e0802c738c23dbba71efd27ab48393da8cafaf77833e1bd3f33a10c01',
    refreshTokenTime: process.env.REFRESH_TOKEN_TIME || '10h',
    accessTokenTime: process.env.ACCESS_TOKEN_TIME || '5m',
    confirmTokenTime: process.env.CONFIRM_TOKEN_TIME || '1h',

    mongoURL:
      process.env.MONGO_URL || 'mongodb+srv://admin:admin@cluster0.clm5vb8.mongodb.net/',

    mongoDB: process.env.MONGO_DB || 'marketplace_teamchallenge',
    mailerUser: process.env.MAILER_USER,
    mailerPass: process.env.MAILER_PASS,
  };

  // production
} else if (environment === 'production') {
  config = {
    port: process.env.PORT || '3002',
    accessSecretKey: process.env.ACCESS_SECRET_KEY || 'Ex0YCKL2bcfnwWtCpqLXYqNqqzgbBxw4',
    refreshSecretKey:
      process.env.REFRESH_SECRET_KEY ||
      'e5e4e8c11f75a835ee6435d29c0b99639c2bcda5ac2ccedb49dadee2ca3f8b9a',
    confirmSecretKey:
      process.env.CONFIRM_SECRET_KEY ||
      '5e30285e0802c738c23dbba71efd27ab48393da8cafaf77833e1bd3f33a10c01',
    refreshTokenTime: process.env.REFRESH_TOKEN_TIME || '10h',
    accessTokenTime: process.env.ACCESS_TOKEN_TIME || '5m',
    confirmTokenTime: process.env.CONFIRM_TOKEN_TIME || '1h',

    mongoURL:
      process.env.MONGO_URL || 'mongodb+srv://admin:admin@cluster0.clm5vb8.mongodb.net/',

    mongoDB: process.env.MONGO_DB || 'marketplace_teamchallenge_prod',
    mailerUser: process.env.MAILER_USER,
    mailerPass: process.env.MAILER_PASS,
  };

  // else (full handle)
} else {
  config = {
    port: process.env.PORT || '3001',
    accessSecretKey: process.env.ACCESS_SECRET_KEY || 'Ex0YCKL2bcfnwWtCpqLXYqNqqzgbBxw4',
    refreshSecretKey:
      process.env.REFRESH_SECRET_KEY ||
      'e5e4e8c11f75a835ee6435d29c0b99639c2bcda5ac2ccedb49dadee2ca3f8b9a',
    confirmSecretKey:
      process.env.CONFIRM_SECRET_KEY ||
      '5e30285e0802c738c23dbba71efd27ab48393da8cafaf77833e1bd3f33a10c01',
    refreshTokenTime: process.env.REFRESH_TOKEN_TIME || '10h',
    accessTokenTime: process.env.ACCESS_TOKEN_TIME || '10h',
    confirmTokenTime: process.env.CONFIRM_TOKEN_TIME || '1h',

    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/',

    mongoDB: process.env.MONGO_DB || 'marketplace_teamchallenge',
    mailerUser: process.env.MAILER_USER,
    mailerPass: process.env.MAILER_PASS,
  };
}

export default config;

/* eslint-enable import/no-mutable-exports */
