
const Lab = require('../models/Lab');
const Device = require('../models/Device');
const SensorReading = require('../models/SensorReading');
const { updateDeviceStatus } = require('../services/deviceService');

const getDashboardSummary = async (req, res) => {
    try {
        // Update device status before fetching dashboard data
        await updateDeviceStatus();

        const labs = await Lab.find({ isActive: true });

        const devices = await Device.find({ isActive: true })
            .select('-apiKey');

        // Fetch the latest reading for each lab
        const [lab1Reading, lab2Reading] = await Promise.all([
            SensorReading.findOne({ labId: 'LAB1' })
                .sort({ recordedAt: -1 }),

            SensorReading.findOne({ labId: 'LAB2' })
                .sort({ recordedAt: -1 })
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalLabs: labs.length,
                totalDevices: devices.length,
                onlineDevices: devices.filter(d => d.isOnline).length,
                offlineDevices: devices.filter(d => !d.isOnline).length,
                labs,
                devices,
                latestReadings: {
                    LAB1: lab1Reading,
                    LAB2: lab2Reading
                }
            }
        });

    } catch (error) {
        console.error('Dashboard summary error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch dashboard summary'
        });
    }
};

module.exports = { getDashboardSummary };
