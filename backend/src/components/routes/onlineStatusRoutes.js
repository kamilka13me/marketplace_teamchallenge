import express from 'express';

import onlineStatusController from '../controllers/onlineStatusController.js';

const router = express.Router();

router.get('/', onlineStatusController.default);

export default router;
