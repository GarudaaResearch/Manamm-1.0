const express = require('express');
const { analyzeText, runExperiment } = require('../controllers/ml.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/analyze', protect, analyzeText);
router.post('/experiment/run', protect, runExperiment);

module.exports = router;
