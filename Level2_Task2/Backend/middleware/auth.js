const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  console.log(token);
  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Token not found in cookies", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Find user by ID from decoded token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorResponse("User not found", 404));
    }

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return next(new ErrorResponse("Access Denied", 401));
  }
  next();
};
