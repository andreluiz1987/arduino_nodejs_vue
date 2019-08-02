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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'temperature'
    }]
});

module.exports = mongoose.model('device', deviceSchema);


