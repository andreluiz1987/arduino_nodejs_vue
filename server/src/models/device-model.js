'use strict ';

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    description: {
        type: String
    },
    code: {
        type: String
    },
    temperatures: [{
        value: {
            type: Number
        },
        date_received: {
            type: Date
        },
    }]
});

module.exports = mongoose.model('device', deviceSchema);


