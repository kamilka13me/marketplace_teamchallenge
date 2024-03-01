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
    refreshTokenTime: process.env.JWT_TOKEN_TIME || '10h',
    accessTokenTime: process.env.JWT_TOKEN_TIME || '10h',

    mongoURL:
      process.env.MONGO_URL || 'mongodb+srv://admin:admin@cluster0.clm5vb8.mongodb.net/',

    mongoDB: process.env.MONGO_DB || 'marketplace_teamchallenge',
  };

  // production
} else if (environment === 'production') {
  config = {
    port: process.env.PORT || '3002',
    accessSecretKey: process.env.ACCESS_SECRET_KEY || 'Ex0YCKL2bcfnwWtCpqLXYqNqqzgbBxw4',
    refreshSecretKey:
      process.env.REFRESH_SECRET_KEY ||
      'e5e4e8c11f75a835ee6435d29c0b99639c2bcda5ac2ccedb49dadee2ca3f8b9a',
    refreshTokenTime: process.env.JWT_TOKEN_TIME || '10h',
    accessTokenTime: process.env.JWT_TOKEN_TIME || '10h',

    mongoURL:
      process.env.MONGO_URL || 'mongodb+srv://admin:admin@cluster0.clm5vb8.mongodb.net/',

    mongoDB: process.env.MONGO_DB || 'marketplace_teamchallenge_prod',
  };

  // else (full handle)
} else {
  config = {
    port: process.env.PORT || '3001',
    accessSecretKey: process.env.ACCESS_SECRET_KEY || 'Ex0YCKL2bcfnwWtCpqLXYqNqqzgbBxw4',
    refreshSecretKey:
      process.env.REFRESH_SECRET_KEY ||
      'e5e4e8c11f75a835ee6435d29c0b99639c2bcda5ac2ccedb49dadee2ca3f8b9a',
    refreshTokenTime: process.env.JWT_TOKEN_TIME || '10h',
    accessTokenTime: process.env.JWT_TOKEN_TIME || '10h',

    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/',

    mongoDB: process.env.MONGO_DB || 'marketplace_teamchallenge',
  };
}

export default config;

/* eslint-enable import/no-mutable-exports */
