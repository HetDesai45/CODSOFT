const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// const isAuthenticated = async (req, res, next) => {
//   console.log(req.cookies)
//   const token = req.cookies.token;
//   console.log("usertoken",token)
//   // Make sure token exists
//   if (!token) {
//       console.log("tokrn not found")
//       return next(new ErrorResponse('You must log in!', 401));
//   }

//   try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id);
//       console.log(decoded)
//       next();

//   } catch (error) {
//       console.log("error",error)
//       return next(new ErrorResponse('You must log in!', 401));
//   }
// };

// function checkForAuthentication(cookieName) {
//   return (req, res, next) => {
//     const token = req.cookies[cookieName];
//     if (!token) return next();
//     console.log(process.env.JWT_SECRET);
//     try {
//       const userPayload = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = userPayload;
//     } catch (error) {
//       console.log(error);
//     }
//     return next();
//   };
// }

// const isAuthenticated = async (req, res, next) => {
//   const token  = await req.cookies.token;
//   console.log("token", token)
//   // Make sure token exists
//   if (!token) {
//     console.log("Token not difined")
//       return next(new ErrorResponse('You must log in!', 401));
//   }

//   try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id);
//       next();

//   } catch (error) {
//       return next(new ErrorResponse('You must log in!', 401));
//   }
// }

const isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return next(new ErrorResponse("Access Denied", 401));
  }
  next();
};

module.exports = {
  // isAuthenticated,
  isAdmin,
};
