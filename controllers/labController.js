
const Lab = require('../models/Lab');

const getAllLabs = async (req, res) => {
    try {
        const labs = await Lab.find({ isActive: true });

        return res.status(200).json({
            success: true,
            count: labs.length,
            data: labs
        });

    } catch (error) {
        console.error('Lab fetch error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch lab information'
        });
    }
};

module.exports = {
    getAllLabs
};
