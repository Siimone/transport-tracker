const express = require('express');
const router = express.Router();
const producer = require('../../services/queue/producer');
const dbService = require('../../services/db/index');
// Setup Rabbit queue
producer.init();
// Received new data from sensors, pushing it on Rabbit Queue
router.post('/', async (req, res) => {
    const body = req.body;
    if(body.lat && body.lon && body.timestamp && body.bus_id){
        producer.pushOnQueue('locations', { bus_id: body.bus_id, timestamp: body.timestamp, lat: body.lat, lon: body.lon });
    }
    res.json({ result: 1 })
});

module.exports = router;