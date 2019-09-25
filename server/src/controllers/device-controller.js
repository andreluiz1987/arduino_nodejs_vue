'use scrict'

const express = require('express');
const deviceService = require('../services/device-service')

let router = express.Router();

router.get('/', deviceService.getDevices);

router.get('/:code/temperatures', deviceService.getLastTemperatureByDeviceCode);

router.get('/temperatures', deviceService.getDevicesTemperatures);

router.post('/turn-on-off/:state', deviceService.turnOnOff);

router.post('/pwm/:value', deviceService.setPWMLed);

module.exports = router;