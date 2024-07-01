const jobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

exports.createJobType = async(req,res,next) =>{
  try {
    const jobt = await jobType.create({
      jobTypeName: req.body.jobTypeName,
      user: req.user.id
    });
    res.status(201).json({
      success: true,
      jobt
    })
  } catch (error) {
    next(error);
  }
}

exports.allJobsType = async(req,res,next)=>{
  try {
    const jobt = await jobType.find();
    res.status(200).json({
      success: true,
      jobt
    })
  } catch (error) {
    next(error);
  }
}