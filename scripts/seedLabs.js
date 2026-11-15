
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Lab = require('../models/Lab');

const seedLabs = async () => {
    try {
        await connectDB();

        const labs = [
            {
                labId: 'LAB1',
                name: 'Laboratory 1',
                description: 'Temperature, humidity, flame and human presence monitoring'
            },
            {
                labId: 'LAB2',
                name: 'Laboratory 2',
                description: 'Temperature, humidity and gas monitoring using MQ-2 and MQ-7'
            }
        ];

        for (const lab of labs) {
            await Lab.findOneAndUpdate(
                { labId: lab.labId },
                { $set: lab },
                { upsert: true, new: true, runValidators: true }
            );

            console.log(`${lab.labId} added/updated successfully!`);
        }

        console.log('\nLab records created successfully!');

    } catch (error) {
        console.error('Lab seeding failed:', error.message);
    } finally {
        await mongoose.disconnect();
    }
};

seedLabs();
