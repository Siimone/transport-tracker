const express = require('express');
const router = express.Router();

const dbService = require('../../services/db');

router.get('/', async (req, res) => {
    const buses = await dbService.listBuses();
    res.json(buses)
});

router.get('/:id/lastLocation', async(req, res) => {
    res.json({timestamp: 2132, lat: 1, lon: 2});
});

router.get('/:id/lastDoorState', async(req, res) => {
    res.json({timestamp: 232, state: 1})
});

router.post('/:id/location', async (req, res) => {
    res.json({ok: 1})
});

router.post('/:id/door', async (req, res) => {
    res.json({ok: 2})
});

module.exports = router;