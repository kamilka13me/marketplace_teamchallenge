export default {
  port: process.env.PORT || 3001,
  baseURL: process.env.BASE_URL || 'http://localhost:3001',
  secretKey: 'Ex0YCKL2bcfnwWtCpqLXYqNqqzgbBxw4',
  mongoURL:
    process.env.mongoURL ||
    process.argv.find((arg) => arg.includes('--mongoURL='))?.split('=')[1] ||
    'mongodb://localhost:27017',
};
