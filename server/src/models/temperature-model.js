'use strict ';

const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
    value: {
        type: Number
    },
    date_received: {
        type: Date
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'device'
    }
});

module.exports = mongoose.model('temperature', temperatureSchema);


