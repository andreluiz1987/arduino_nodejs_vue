'use strict'

const express = require('express');
const controller = require('../controllers/device-controller');

let router = express.Router();
router.use('/devices', controller);

module.exports = router

