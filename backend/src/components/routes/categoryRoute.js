import express from 'express';

import categoryController from '../controllers/categoryController.js';

const categoryRoute = express.Router();

categoryRoute.post('/', categoryController.createCategory);

categoryRoute.get('/', categoryController.getCategory);

export default categoryRoute;
