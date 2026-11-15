
const { updateDeviceStatus } = require('../services/deviceService');

const getDeviceStatus = async (req, res) => {
    try {
        const devices = await updateDeviceStatus();

        return res.status(200).json({
            success: true,
            count: devices.length,
            data: devices
        });

    } catch (error) {
        console.error('Device status error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch device status'
        });
    }
};

module.exports = {
    getDeviceStatus
};
