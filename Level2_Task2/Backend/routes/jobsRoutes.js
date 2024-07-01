const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createJob, signlejob, updatejob, showjob } = require('../Controllers/jobsController');
const router = express.Router();

router.post('/job/create', isAuthenticated, isAdmin, createJob);
router.get('/job/:id', signlejob);
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updatejob);
router.get('/job/show',showjob);

module.exports = router;