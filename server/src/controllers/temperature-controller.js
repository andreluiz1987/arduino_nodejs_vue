'use scrict'

const deviceRepo = require('../repositories/device-repository');
const repo = require('../repositories/temperature-repository');

exports.getTemperature = async (req, res, next) => {

    try {
        var data = await repo.getTemperature();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: "Falha ao processar sua requisição."
        });
    }
};

exports.getLastTemperature = async (req, res, next) => {

    try {
        var data = await repo.getLastTemperature();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: "Falha ao processar sua requisição."
        });
    }
};

exports.post = async (data) => {
    try {
        var data = await repo.create(data);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: "Falha ao registrar a temperatura."
        });
    }
}

exports.saveTemperature = async (data) => {
    try {

        let arrDevice = data.split(';');

        arrDevice.forEach(async element => {

            let deviceCode = element.split(':')[0];
            let temperatureValue = element.split(':')[1];

            let device = await deviceRepo.getDeviceByCode(deviceCode);

            if (device == undefined) {
                device = await deviceRepo.create(deviceCode)
            }

            let temperature = {
                value: temperatureValue,
                device: device._id
            }

            var data = await repo.create(temperature);

            if (data._id) {
                console.log(">>>>> TEMPERATURA INSERIDA: ", data)
                device.temperatures.push(data)
                device.save();
            } else {
                console.log("TEMPERATURA NAO REGISTRADA")
            }
        });
    } catch (e) {
        console.log(e)
        console.log("Falha ao registrar a temperatura.");
    }
}