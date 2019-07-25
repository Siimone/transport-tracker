require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

const server = app.listen(3000);
global.io = require('socket.io')(server);

const dbService = require('./services/db');
const redisService = require('./services/redis');
const consumer = require('./services/queue/consumer');

const busRouter = require('./routes/bus');
const dataRouter = require('./routes/data');

dbService.testConnection();
redisService.testConnection();


io.on('connection', function(socket){
    console.log('SOCKET.IO OK!');
});

app.get('/', (req, res) => {
    res.json({1: 1})
});

app.use('*', (req, res, next) => {
    // console.log('LOGGED ' + req.originalUrl);
    next();
});
app.use(bodyParser.json());
app.use('/bus', busRouter);
app.use('/data', dataRouter);
/*module.exports = {
    io
};*/