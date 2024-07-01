const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { createJobType, allJobsType } = require('../Controllers/jobTypeController');
const router = express.Router();

router.post('/type/create', isAuthenticated, createJobType);
router.get('/type/jobs', isAuthenticated, allJobsType);

module.exports = router;