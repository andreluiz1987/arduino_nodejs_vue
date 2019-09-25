'use strict'

const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicle-controller');

router.get('/vehicle/direction', vehicleController.getCarPosition)

module.exports = router