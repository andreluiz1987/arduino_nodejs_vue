'use strict';

const Device = require('../models/device-model')

exports.getDeviceByCode = async (code) => {
    let res = await Device.findOne({
        code: code
    });

    return res;
}

exports.getLastTemperatureByDeviceCode = async (code) => {
    let res = await Device.findOne({
        code: code
    },
        { temperatures: { $slice: -5} }
    );

    return res;
}

exports.getLastTemperatures = async () => {
    let res = await Device.find({
    },
        { temperatures: { $slice: -1 } }
    );

    return res;
}

exports.getDevices = async () => {
    let res = await Device.find({}).populate('temperatures');
    return res;
}

exports.create = async (data) => {

    let device = new Device();
    device.description = '';
    device.code = data

    let response = await device.save();

    return response;
};

exports.updateTemperatures = async (deviceCode, temperature) => {
    let device = await this.getDeviceByCode(deviceCode);   
    
    if(!device){
        device = await this.create(deviceCode)
    }
    
    let temp = new Object();
    temp.value = temperature;
    temp.date_received = new Date();

    device.temperatures.push(temp)
    
    let response = await device.save();
    return response;
};