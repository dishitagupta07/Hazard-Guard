
require('dotenv').config();

const crypto = require('crypto');
const connectDB = require('../config/db');
const Device = require('../models/Device');

const registerDevices = async () => {
    try {
        await connectDB();

        const devices = [
            {
                deviceId: 'LAB1_DEVICE',
                labId: 'LAB1',
                deviceName: 'ESP32 - Lab 1'
            },
            {
                deviceId: 'LAB2_DEVICE',
                labId: 'LAB2',
                deviceName: 'ESP32 - Lab 2'
            }
        ];

        for (const deviceInfo of devices) {
            let device = await Device.findOne({
                deviceId: deviceInfo.deviceId
            }).select('+apiKey');

            if (device) {
                console.log(`\n${deviceInfo.deviceId} already exists.`);
                console.log('Existing API Key:', device.apiKey);
                continue;
            }

            const apiKey = crypto.randomBytes(32).toString('hex');

            device = await Device.create({
                ...deviceInfo,
                apiKey
            });

            console.log(`\n${device.deviceId} registered successfully!`);
            console.log('Lab:', device.labId);
            console.log('API Key:', apiKey);
        }

        console.log('\nDevice registration completed!');

    } catch (error) {
        console.error('Device registration failed:', error.message);
    } finally {
        const mongoose = require('mongoose');
        await mongoose.disconnect();
    }
};

registerDevices();
