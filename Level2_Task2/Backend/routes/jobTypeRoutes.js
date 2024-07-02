const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { createJobType, allJobsType, updateJobType, deleteJobType } = require('../Controllers/jobTypeController');
const router = express.Router();

router.post('/type/create', isAuthenticated, createJobType);
router.get('/type/jobs', isAuthenticated, allJobsType);
router.put('/type/update/:type_id',isAuthenticated,isAdmin, updateJobType);
router.delete('/type/delete/:type_id',isAuthenticated,isAdmin, deleteJobType);

module.exports = router;