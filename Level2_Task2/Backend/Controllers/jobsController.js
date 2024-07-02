const job = require('../models/jobModel');
const jobType = require('../models/jobTypeModel');

const ErrorResponse = require('../utils/errorResponse');

exports.createJob = async(req,res,next) =>{
  try {
    const Job = await job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      user: req.user.id
    });
    res.status(201).json({
      success: true,
      Job
    })
  } catch (error) {
    next(error);
  }
}

exports.signlejob = async (req,res,next) =>{
  try {
    const Job = await job.findById(req.params.id);
    res.status(200).json({
      success: true,
      Job
    })
  } catch (error) {
    next(error);
  }
}

exports.updatejob = async (req,res,next) =>{
  try {
    const Job = await job.findByIdAndUpdate(req.params.job_id, req.body, {new: true}).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
    res.status(200).json({
      success: true,
      Job
    })
  } catch (error) {
    next(error);
  }
}

exports.showjob = async (req,res,next) =>{

  const keyword = req.query.keyword?{
    title:{
      $regex: req.query.keyword,
      $options: 'i'
    }
  }: {}

  let ids = []
  const jobTypeCategory = await jobType.find({}, {_id:1});
  jobTypeCategory.forEach(cat=>{
    ids.push(cat._id);
  })

  let cat = req.query.cat;
  let categ = cat !== '' ? cat : ids;

  let locations = [];
  const jobByLocation = await job.find({},{location: 1});
  jobByLocation.forEach(val =>{
    locations.push(val.location);
  })
  let setUniqueLocation = [...new set(locations)];
  let location = req.query.location;
  let locationFilter = location !== '' ? location : setUniqueLocation;


  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const count = await job.find({...keyword, jobType: categ}).countDocuments();

  try {
    const Job = await job.find({...keyword, jobType: categ, location: locationFilter}).skip(pageSize*(page-1)).limit(pageSize);
    res.status(200).json({
      success: true,
      Job,
      page,
      pages: Math.ceil(count/pageSize),
      count,
      jobTypeCategory
    })
  } catch (error) {
    next(error);
  }
}
