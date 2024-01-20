// statusRoute.js

const express = require('express');

const StatusController = require('../controllers/statusController');

const router = express.Router();



// ping server route
router.get('/ping', StatusController.ping);


// info server route
router.post('/info', StatusController.info);



module.exports = router;
