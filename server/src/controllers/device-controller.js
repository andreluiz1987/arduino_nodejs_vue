'use scrict'

const repo = require('../repositories/device-repository');
const serialService = require('../services/portserial-service');

exports.getDevices = async (req, res, next) => {

    try {
        var data = await repo.getDevices();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: "Falha ao recuperar devices."
        });
    }
};

exports.getDevicesByCode = async (code) => {
    try {
        var data = await repo.getDeviceByCode(code);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: "Falha ao recuperar device."
        });
    }
}

exports.getLastTemperatureByDeviceCode = async (req, res, next) => {
    try {
        var data = await repo.getLastTemperatureByDeviceCode(req.params.code);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: "Falha ao recuperar device."
        });
    }
}

exports.getLastTemperatureByDeviceCode = async (req, res, next) => {
    try {

        var data = await repo.getLastTemperatureByDeviceCode(req.params.code);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: "Falha ao recuperar device."
        });
    }
}

exports.getLastTemperatures = async (req, res, next) => {
    try {
        var data = await repo.getLastTemperatures();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: "Falha ao recuperar device."
        });
    }
}

exports.turnOnOff = (req, res, next) => {
    try {
        let state = (req.params.state == 'true') ? "TURN_ON" : "TURN_OFF";
        serialService.writeData(state);
        res.status(200).json({
            message: state
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Falha ao recuperar device."
        });
    }
}

exports.setPWMLed = (req, res, next) => {
    try {
        let value = req.params.value;
        serialService.writeData(`PWM_${value}`);
        res.status(200).json({
            message: value
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Falha ao enviar o valor para o device."
        });
    }
}