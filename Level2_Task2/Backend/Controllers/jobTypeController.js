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
    const jobt = await jobType.find({});
    res.status(200).json({
      success: true,
      jobt
    })
  } catch (error) {
    next(error);
  }
}

exports.updateJobType = async(req,res,next)=>{
  try {
    const jobt = await jobType.findByIdAndUpdate(req.params.type_id, req.body, {new: true});
    res.status(200).json({
      success: true,
      jobt
    })
  } catch (error) {
    next(error);
  }
}

exports.deleteJobType = async(req,res,next)=>{
  try {
    const jobt = await jobType.findByIdAndDelete(req.params.type_id);
    res.status(200).json({
      success: true,
      message: "Job Type Deleted"
    })
  } catch (error) {
    next(new ErrorResponse("Server Error", 500));
  }
}