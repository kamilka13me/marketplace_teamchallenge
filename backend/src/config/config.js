export default {
  port:
    process.env.PORT ||
    process.argv.find((arg) => arg.includes('--port='))?.split('=')[1] ||
    3001,
  baseURL: process.env.BASE_URL || 'http://localhost:3001',
  secretKey: 'Ex0YCKL2bcfnwWtCpqLXYqNqqzgbBxw4',
  jwtTokenTime: '10h',
  mongoURL:
    process.env.mongoURL ||
    process.argv.find((arg) => arg.includes('--mongoURL='))?.split('=')[1] ||
    'mongodb://localhost:27017/',
  mongoDB:
    process.env.mongoDB ||
    process.argv.find((arg) => arg.includes('--mongoDB='))?.split('=')[1] ||
    'marketplace_teamchallenge',
};
