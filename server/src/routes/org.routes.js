const express = require('express');
const { getOrgDetails, updateOrgBranding, bulkCreateUsers } = require('../controllers/org.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', protect, getOrgDetails);
router.patch('/branding', protect, authorize('SUPER_ADMIN', 'ORG_ADMIN'), updateOrgBranding);
router.post('/bulk-users', protect, authorize('SUPER_ADMIN', 'ORG_ADMIN', 'FACULTY'), bulkCreateUsers);

module.exports = router;
