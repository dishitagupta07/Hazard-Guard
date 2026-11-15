
const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
    labId: {
        type: String,
        required: true,
        unique: true,
        enum: ['LAB1', 'LAB2']
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ''
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Lab', labSchema);
