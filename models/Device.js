
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    labId: {
        type: String,
        required: true,
        enum: ['LAB1', 'LAB2']
    },

    deviceName: {
        type: String,
        default: 'ESP32'
    },

    apiKey: {
        type: String,
        required: true,
        select: false
    },

    isOnline: {
        type: Boolean,
        default: false
    },

    lastSeen: {
        type: Date,
        default: null
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema);
