
const mongoose = require('mongoose');

const thresholdConfigSchema = new mongoose.Schema({
    labId: {
        type: String,
        required: true,
        enum: ['LAB1', 'LAB2']
    },

    sensorType: {
        type: String,
        required: true,
        enum: ['temperature', 'humidity', 'flame', 'mq2', 'mq7']
    },

    warningThreshold: {
        type: Number,
        default: null
    },

    criticalThreshold: {
        type: Number,
        default: null
    },

    isEnabled: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

// Each lab can have only one configuration per sensor type
thresholdConfigSchema.index(
    { labId: 1, sensorType: 1 },
    { unique: true }
);

module.exports = mongoose.model('ThresholdConfig', thresholdConfigSchema);
