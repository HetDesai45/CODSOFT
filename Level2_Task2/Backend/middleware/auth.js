const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req,res,next) =>{
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.access_token;
  }

  console.log(token)

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  }catch(error){
    return  next(new ErrorResponse("Not authorized", 401));
  }
}

exports.isAdmin = (req,res,next)=>{
  if(req.user.role === 0){
    return next(new ErrorResponse("Access Denied",401));
  }
  next();
}