const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.allUsers = async (req,res,next)=>{
  
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();
  try{
    const users = await User.find()
    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.cei1(count / pageSize),
      count
    })
  }catch(error){
    return next(error);
  }
}

exports.singleUser = async (req,ers,next) =>{
  try{
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user
    })
    next();
  }catch(error){
    return next(error);
  }
}

exports.editUser = async (req,ers,next) =>{
  try{
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({
      success: true,
      user
    })
    next();
  }catch(error){
    return next(error);
  }
}

exports.deleteUser = async (req,res,next) =>{
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User Deleted"
    })
    next();
  }catch(error){
    return next(error);
  }
}

exports.createUserJobHistory = async (req,res,next) =>{
  const {title, description, salary, location} = req.body;
  try{
    const currentuser = await User.findOne({_id: req.user._id});
    if(!currentuser){
      return next(new ErrorResponse("You must LogIn",401));
    }else{
      const addJobHistory ={
        title,
        description,
        salary,
        location,
        user:req.user._id
      }
      currentuser.jobsHistory.push(addJobHistory);
      await currentuser.save();
    }
    res.status(200).json({
      success: true,
      currentuser
    })
    next();
  }catch(error){
    return next(error);
  }
}