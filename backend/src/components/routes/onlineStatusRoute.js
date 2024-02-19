import express from 'express';

import onlineStatusController from '../controllers/onlineStatusController.js';

const onlineStatusRoute = express.Router();

onlineStatusRoute.get('/', onlineStatusController.default);

export default onlineStatusRoute;
