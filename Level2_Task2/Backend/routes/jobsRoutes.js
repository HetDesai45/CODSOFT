const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createJob, signlejob, updatejob, showjob, deleteJob } = require('../Controllers/jobsController');
const router = express.Router();

router.post('/job/create', isAuthenticated, createJob);
router.get('/job/:id', signlejob);
router.put('/job/update/:job_id', isAuthenticated, updatejob);
router.delete('/job/delete/:job_id', isAuthenticated, deleteJob);
router.get('/jobs/show',showjob);

module.exports = router;