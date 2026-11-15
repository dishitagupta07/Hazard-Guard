
const express = require('express');
const router = express.Router();

const { getAllLabs } = require('../controllers/labController');

router.get('/', getAllLabs);

module.exports = router;
