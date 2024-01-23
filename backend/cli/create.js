import fs from 'fs/promises';
import path from 'path';

const generateFile = async (filePath, content) => {
  await fs.writeFile(filePath, content, 'utf-8');
  console.log(`file created: ${filePath}`);
};

const generateRoute = async (name) => {
  const routeFilePath = path.join(
    new URL(import.meta.url).pathname.slice(1),
    '../../src/components/routes',
    `${name}Routes.js`,
  );

  // check is exist
  if (await fileExists(routeFilePath)) {
    console.error(`Помилка: Файл ${name}Routes.js вже існує.`);
    return;
  }

  const routeContent = `
  import express from 'express';
  import ${name}Controller from '../controllers/${name}Controller.js';

  const router = express.Router();

  router.get('/', ${name}Controller.default);

  export default router;
`;

  await generateFile(routeFilePath, routeContent);
};

const generateController = async (name) => {
  const controllerFilePath = path.join(
    new URL(import.meta.url).pathname.slice(1),
    '../../src/components/controllers',
    `${name}Controller.js`,
  );

  // check is exist
  if (await fileExists(controllerFilePath)) {
    console.error(`Помилка: Файл ${name}Controller.js вже існує.`);
    return;
  }

  const controllerContent = `
  const ${name}Controller = {

    default: async (req, res) => {
    res.send('${name} index');
  },
  
  
  };

  export default ${name}Controller;
`;

  await generateFile(controllerFilePath, controllerContent);
};

// check is exist file
const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

// get args
const args = process.argv.slice(2);

// check args.name
if (args.length !== 1) {
  console.error('error need arg "name".');
} else {
  const name = args[0];

  generateRoute(name);
  generateController(name);
}
