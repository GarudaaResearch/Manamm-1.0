const express = require('express');
const { register, login, onboardOrg } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/onboard-org', onboardOrg);

module.exports = router;
