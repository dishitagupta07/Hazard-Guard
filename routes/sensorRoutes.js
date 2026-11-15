const express = require('express');
const router = express.Router();

const deviceAuth = require('../middleware/deviceAuth');

const {
    receiveSensorData,
    getLatestSensorReading,
    getSensorHistory
} = require('../controllers/sensorController');


// ESP32 sensor data ingestion
router.post('/data', deviceAuth, receiveSensorData);

// Fetch latest sensor reading
router.get('/latest/:labId', getLatestSensorReading);
router.get('/history/:labId', getSensorHistory);
module.exports = router;