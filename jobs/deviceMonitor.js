
const { updateDeviceStatus } = require('../services/deviceService');

const startDeviceMonitor = () => {

    console.log('Device monitor started!');

    // Check device status every 10 seconds
    setInterval(async () => {
        try {
            await updateDeviceStatus();
        } catch (error) {
            console.error('Device monitor error:', error.message);
        }
    }, 10 * 1000);
};

module.exports = startDeviceMonitor;
