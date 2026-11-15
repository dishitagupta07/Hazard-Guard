
const SensorReading = require('../models/SensorReading');
const Device = require('../models/Device');

const saveSensorReading = async (device, data) => {

    if (data.labId && data.labId !== device.labId) {
        throw new Error('Lab ID does not match registered device');
    }

    const readingData = {
        labId: device.labId,
        deviceId: device.deviceId,
        temperature: data.temperature,
        humidity: data.humidity
    };

    if (device.labId === 'LAB1') {
        readingData.flameDetected = data.flameDetected;
        readingData.humanDetected = data.humanDetected;
    }

    else if (device.labId === 'LAB2') {
        readingData.mq2Raw = data.mq2Raw;
        readingData.mq7Raw = data.mq7Raw;
    }

    else {
        throw new Error('Unsupported lab ID');
    }

    const reading = await SensorReading.create(readingData);

    const wasOffline = !device.isOnline;
const lastSeen = new Date();

await Device.findByIdAndUpdate(device._id, {
    isOnline: true,
    lastSeen: lastSeen
});

// Notify frontend only when device comes online
if (wasOffline && global.io) {
    global.io.emit('deviceStatusUpdate', {
        deviceId: device.deviceId,
        labId: device.labId,
        isOnline: true,
        lastSeen: lastSeen
    });
}

    return reading;
};

// Fetch the latest reading for a particular lab
const getLatestReading = async (labId) => {

    const reading = await SensorReading.findOne({ labId })
        .sort({ recordedAt: -1 });

    return reading;
};
// Fetch historical readings for a particular lab
const getHistoricalReadings = async (labId, startDate, endDate, limit) => {

    const filter = { labId };

    if (startDate || endDate) {
        filter.recordedAt = {};

        if (startDate) {
            filter.recordedAt.$gte = startDate;
        }

        if (endDate) {
            filter.recordedAt.$lte = endDate;
        }
    }

    const readings = await SensorReading.find(filter)
        .sort({ recordedAt: 1 })
        .limit(limit);

    return readings;
};

module.exports = {
    saveSensorReading,
    getLatestReading,
    getHistoricalReadings
};
