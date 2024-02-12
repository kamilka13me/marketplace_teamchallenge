// swager.mjs
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fullPath = resolve(__dirname, '../../src/components/routes/*.js');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Marketplace Api',
      version: '1.0.0',
      description: 'Simple Marketplace Api',
      contact: {
        name: 'Yaroslav',
        email: 'kamilka13me@gmal.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001/api/',
        description: 'Main local server Api',
      },
      {
        url: 'http://31.222.235.61:3001/api/',
        description: 'Main dev server Api',
      },
      {
        url: 'http://31.222.235.61:3002/api/',
        description: 'Main  server Api',
      },
      {
        url: 'http://alicesocial.pp.ua:3001/api/',
        description: 'Yaroslav`s home server',
      },
    ],
    tags: [
      {
        name: 'Status',
        description: 'Operations related to server status.',
      },

      {
        name: 'User',
        description: 'Operations related to User.',
      },
      {
        name: 'Authentication',
        description: 'Operations related to Authentication.',
      },
      {
        name: 'Roles',
        description: 'Operations related to user roles in the system.',
      },
    ],
  },
  apis: [`${fullPath}`],
};

// console.log(fullPath);

const specs = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
  // eslint-disable-next-line no-console
  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
