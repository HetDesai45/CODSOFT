const Errorresponse = require("../utils/errorResponse");

const errorHandler = (err,req,res,next) =>{
  let error = {...err};
  error.message = err.message;

  if(err.name === "CastError"){
    const message = `Resource not fount ${err.value}`;
    error = new Errorresponse(message, 404);
  }

  if(err.code === 11000){
    const message = `Duplicate fiels value entered`;
    error = new Errorresponse(message, 400);
  }

  if(err.name === "ValidationError"){
    const message = Object.values(err.errors).map(val => ' ' + val.message);
    error = new Errorresponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error"
  })
}

module.exports = errorHandler;