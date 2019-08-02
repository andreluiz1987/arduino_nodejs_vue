require('console-stamp')(console, '[HH:MM:ss.l]');

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const serialPort = require('./src/services/portserial-service');
const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.connect(config.connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true
});

//Cors Port
app.use(cors());

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

//Carregar as rotas
const files = fs.readdirSync(__dirname + '/src/routes/').filter(function (x) { return x.substr(-3) == ".js"; });
for (let i = 0; i != files.length; ++i) {
	app.use('/api/v1', require('./src/routes/' + files[i]))
}

serialPort.init();

module.exports = app;