const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
  console.log(req.cookies)
  const token = req.cookies.token;
  console.log("usertoken",token)
  // Make sure token exists
  if (!token) {
      console.log("tokrn not found")
      return next(new ErrorResponse('You must log in!', 401));
  }

  try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      console.log(decoded)
      next();

  } catch (error) {
      console.log("error",error)
      return next(new ErrorResponse('You must log in!', 401));
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return next(new ErrorResponse("Access Denied", 401));
  }
  next();
};

module.exports = {
  isAuthenticated,
  isAdmin
}