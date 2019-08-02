'use strict';

const Temperature = require('../models/temperature-model')

exports.getTemperature = async () => {
    let res = await Temperature.find();
    return res;
}

exports.getLastTemperature = async () => {
    let res = await Temperature.findOne({}).sort({ date_received: 'desc' });
    return res;
}

exports.create = async (data) => {
    let temperature = new Temperature();
    temperature.value = data.value;
    temperature.device = data.device;
    temperature.date_received = new Date();

    let response = await temperature.save();
    
    return response;
};
