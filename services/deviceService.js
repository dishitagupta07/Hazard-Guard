
const Device = require('../models/Device');

const OFFLINE_THRESHOLD = 30 * 1000; // 30 seconds

// Check whether a device is online or offline
const updateDeviceStatus = async () => {

    const cutoffTime = new Date(Date.now() - OFFLINE_THRESHOLD);

    // Find devices that were online but haven't sent data recently
    const newlyOfflineDevices = await Device.find({
        isActive: true,
        isOnline: true,
        lastSeen: { $lt: cutoffTime }
    });

    // Mark each device offline and notify the frontend
    for (const device of newlyOfflineDevices) {

        device.isOnline = false;
        await device.save();

        const io = global.io;

        if (io) {
            io.emit('deviceStatusUpdate', {
                deviceId: device.deviceId,
                labId: device.labId,
                isOnline: false,
                lastSeen: device.lastSeen
            });
        }
    }

    // Return all registered active devices
    const devices = await Device.find({ isActive: true })
        .select('-apiKey');

    return devices;
};

module.exports = {
    updateDeviceStatus
};
