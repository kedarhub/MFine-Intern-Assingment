const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

router.post('/', parkingController.parkCar);

module.exports = router;
