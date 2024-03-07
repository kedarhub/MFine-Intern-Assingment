const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.delete('/', leaveController.leaveCar);

module.exports = router;
