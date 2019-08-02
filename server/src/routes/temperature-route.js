'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/temperature-controller')

router.get('/temperatures', controller.getLastTemperature)

router.post('/temperatures', controller.post)

module.exports = router

