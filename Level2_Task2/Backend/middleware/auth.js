const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.isAuthenticated = async (req, res, next) => {
  const {token} = req.cookies;


  if (token === null) {
    return next(new ErrorResponse("Token not found in cookies", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    return next(new ErrorResponse("User not found", 404));
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return next(new ErrorResponse("Access Denied", 401));
  }
  next();
};
