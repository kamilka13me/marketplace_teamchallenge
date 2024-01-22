// swager.mjs

import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fullPath = resolve(__dirname, '../../src/components/routes/*.mjs');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Marketplace Api',
      version: '1.0.0',
      description: 'Simple Marketplace Api',
      contact: {
        name: 'Yaroslav',
        email: 'kamilka13me@gmal.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001/api/',
        description: 'main server Api'
      }
    ],
  },
  apis: [`${fullPath}`],
};

// console.log(fullPath);

const specs = swaggerJSDoc(options);
export default specs;
