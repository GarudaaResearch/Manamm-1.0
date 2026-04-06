const express = require('express');
const { createProject, getProjects, uploadDataset, getProjectDetails } = require('../controllers/project.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', protect, createProject);
router.get('/', protect, getProjects);
router.get('/:id', protect, getProjectDetails);
router.post('/upload-dataset', protect, uploadDataset);

module.exports = router;
