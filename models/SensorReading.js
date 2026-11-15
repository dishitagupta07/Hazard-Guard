
const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
    labId: {
        type: String,
        required: true,
        enum: ['LAB1', 'LAB2']
    },

    deviceId: {
        type: String,
        required: true
    },

    temperature: {
        type: Number,
        default: null
    },

    humidity: {
        type: Number,
        default: null
    },

    flameDetected: {
        type: Boolean,
        default: null
    },

    humanDetected: {
        type: Boolean,
        default: null
    },

    mq2Raw: {
        type: Number,
        default: null
    },

    mq7Raw: {
        type: Number,
        default: null
    },

    recordedAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

// Efficiently retrieve readings for a lab in chronological order
sensorReadingSchema.index({ labId: 1, recordedAt: -1 });

// Efficiently retrieve readings for a particular device
sensorReadingSchema.index({ deviceId: 1, recordedAt: -1 });

module.exports = mongoose.model('SensorReading', sensorReadingSchema);
