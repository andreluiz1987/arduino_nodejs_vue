const serialport = require('serialport');
const Readline = serialport.parsers.Readline;

const controller = require('../controllers/temperature-controller');
const vehiclecontroller = require('../controllers/vehicle-controller');
const config = require('../../config.json');

var port = null;
var parser = null;

function init() {

    port = new serialport(config.port_usb, {
        baudRate: 9600
    });

    parser = port.pipe(new Readline({ delimiter: '\n' }))

    //Tratar eventos
    port.on('open', onOpen);
    parser.on('data', onData);
    port.on('close', onClose);
}

function onData(data) {
    
    if (data.indexOf("SALA") >= 0) {
        console.log("received: ", data);
        controller.saveTemperature(data);
    } else {
        vehiclecontroller.setDirectionCar(data);
    }
}

function onOpen() {
    console.log("port serial open");
}

function onClose() {
    console.log("port serial close");
    port = null;
    parser = null;
}

function writeData(msg) {
    console.log("DATA_SENDING: ", msg);
    port.write(msg);
}

module.exports = {
    init,
    writeData
};