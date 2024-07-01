const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const jobTypeSchema = new mongoose.Schema({
  jobTypeName:{
    type: String,
    trim: true,
    required: [true, 'Job category is required'],
    maxlength: 70,
  },
  user:{
    type: ObjectId,
    ref: "user",
    required: true
  }
  
}, {timestamps:true});

const jobType = mongoose.model("jobType",jobTypeSchema);

module.exports = jobType;