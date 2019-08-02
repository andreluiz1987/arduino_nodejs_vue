'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/device-controller');
const vehicleController = require('../controllers/vehicle-controller');

router.get('/devices', controller.getDevices);

router.get('/devices/:code/temperatures', controller.getLastTemperatureByDeviceCode);

router.get('/devices/temperatures', controller.getLastTemperatureByDevice);

router.post('/devices/turn-on-off/:state', controller.turnOnOff);

router.post('/devices/pwm/:value', controller.setPWMLed);

router.get('/vehicle/direction', vehicleController.getCarPosition);

module.exports = router

