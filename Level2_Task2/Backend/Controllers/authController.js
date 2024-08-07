const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("E-mail laready registred", 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return next(new ErrorResponse("Please Enter an Email", 403));
    }
    if (!password) {
      return next(new ErrorResponse("Please Enter a Password", 403));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 403));
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid Credentials", 403));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// const sendTokenResponse = async (user, codeStatus, res) => {
//   const token = await user.getJwtToken();
//   return res
//     .setHeader("Access-Control-Allow-Credentials", true)
//     .status(codeStatus)
//     .cookie("token", token, {
//       httpOnly: true,
//     })
//     .json({
//       success: true,
//       role: user.role,
//       user,
//       token,
//     });
// };

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 60 * 60 * 1000 })
    .json({
      success: true,
      role: user.role,
      user
    });
};

exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

exports.userProfile = async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};
