
const Device = require('../models/Device');

const deviceAuth = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];

        // Check whether API key was provided
        if (!apiKey) {
            return res.status(401).json({
                success: false,
                message: 'API key is missing'
            });
        }

        // Find the registered device using its API key
        const device = await Device.findOne({
            apiKey: apiKey,
            isActive: true
        }).select('+apiKey');

        // Reject unregistered devices
        if (!device) {
            return res.status(401).json({
                success: false,
                message: 'Invalid API key or inactive device'
            });
        }

        // Attach device information to the request
        req.device = device;

        next();

    } catch (error) {
        console.error('Device authentication error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Device authentication failed'
        });
    }
};

module.exports = deviceAuth;
