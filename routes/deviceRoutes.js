
const express = require('express');
const router = express.Router();

const { getDeviceStatus } = require('../controllers/deviceController');

// Get online/offline status of all devices
router.get('/status', getDeviceStatus);

module.exports = router;
