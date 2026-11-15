
const validateSensorData = (data, labId) => {

    if (!data || typeof data !== 'object') {
        return 'Invalid sensor data';
    }

    // Common sensors in both labs
    if (
        typeof data.temperature !== 'number' ||
        !Number.isFinite(data.temperature)
    ) {
        return 'Temperature must be a valid number';
    }

    if (
        typeof data.humidity !== 'number' ||
        !Number.isFinite(data.humidity) ||
        data.humidity < 0 ||
        data.humidity > 100
    ) {
        return 'Humidity must be a number between 0 and 100';
    }

    // Lab 1: DHT22, Flame Sensor, mmWave Radar
    if (labId === 'LAB1') {

        if (typeof data.flameDetected !== 'boolean') {
            return 'flameDetected must be true or false';
        }

        if (typeof data.humanDetected !== 'boolean') {
            return 'humanDetected must be true or false';
        }

    }

    // Lab 2: DHT22, MQ-2, MQ-7
    else if (labId === 'LAB2') {

        if (
            typeof data.mq2Raw !== 'number' ||
            !Number.isFinite(data.mq2Raw) ||
            data.mq2Raw < 0
        ) {
            return 'mq2Raw must be a valid non-negative number';
        }

        if (
            typeof data.mq7Raw !== 'number' ||
            !Number.isFinite(data.mq7Raw) ||
            data.mq7Raw < 0
        ) {
            return 'mq7Raw must be a valid non-negative number';
        }

    }

    else {
        return 'Invalid lab ID';
    }

    return null;
};

module.exports = validateSensorData;
