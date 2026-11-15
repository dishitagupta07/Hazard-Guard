
const validateSensorData = require('../utils/sensorValidators');
const { saveSensorReading } = require('../services/sensorService');

const receiveSensorData = async (req, res) => {
    try {
        const data = req.body;
        const device = req.device;

        // Validate incoming sensor data
        const validationError = validateSensorData(
            data,
            device.labId
        );

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        // Save the reading using sensor service
        const reading = await saveSensorReading(device, data);
        
        return res.status(201).json({
            success: true,
            message: 'Sensor data received successfully',
            data: reading
        });

    } catch (error) {
        console.error('Sensor controller error:', error.message);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getLatestSensorReading = async (req, res) => {
    try {
        const { labId } = req.params;

        if (!['LAB1', 'LAB2'].includes(labId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid lab ID'
            });
        }

        const { getLatestReading } = require('../services/sensorService');

        const reading = await getLatestReading(labId);

        if (!reading) {
            return res.status(404).json({
                success: false,
                message: 'No sensor readings found'
            });
        }

        return res.status(200).json({
            success: true,
            data: reading
        });

    } catch (error) {
        console.error('Latest reading error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch latest sensor reading'
        });
    }
};
const getSensorHistory = async (req, res) => {
    try {
        const { labId } = req.params;

        if (!['LAB1', 'LAB2'].includes(labId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid lab ID'
            });
        }

        const { startDate, endDate, limit = 100 } = req.query;

        const parsedLimit = Number(limit);

        if (
            !Number.isInteger(parsedLimit) ||
            parsedLimit < 1 ||
            parsedLimit > 1000
        ) {
            return res.status(400).json({
                success: false,
                message: 'Limit must be between 1 and 1000'
            });
        }

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (
            (start && Number.isNaN(start.getTime())) ||
            (end && Number.isNaN(end.getTime()))
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format'
            });
        }

        if (start && end && start > end) {
            return res.status(400).json({
                success: false,
                message: 'Start date cannot be after end date'
            });
        }

        const { getHistoricalReadings } = require('../services/sensorService');

        const readings = await getHistoricalReadings(
            labId,
            start,
            end,
            parsedLimit
        );

        return res.status(200).json({
            success: true,
            count: readings.length,
            data: readings
        });

    } catch (error) {
        console.error('Sensor history error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch historical sensor readings'
        });
    }
};

module.exports = {
    receiveSensorData,
    getLatestSensorReading,
    getSensorHistory
};
