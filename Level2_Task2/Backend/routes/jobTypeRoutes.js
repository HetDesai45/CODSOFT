const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createJobType, allJobsType, updateJobType, deleteJobType } = require('../Controllers/jobTypeController');
const router = express.Router();

router.post('/type/create',  createJobType);
router.get('/type/jobs', allJobsType);
router.put('/type/update/:type_id',isAdmin, updateJobType);
router.delete('/type/delete/:type_id',isAdmin, deleteJobType);

module.exports = router;