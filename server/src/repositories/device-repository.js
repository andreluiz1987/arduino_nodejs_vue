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
    ).populate('temperatures');

    return res;
}

exports.getLastTemperatureByDevice = async (code) => {
    let res = await Device.find({
    },
        { temperatures: { $slice: -1 } }
    ).populate('temperatures');

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
