const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {ObjectId} = mongoose.Schema;

const jobHistorySchema = new mongoose.Schema({
  title:{
    type: String,
    trim: true,
    maxlength: 70,
  },
  description:{
    type: String,
    trim: true,
  },
  salary:{
    type: String,
    trim: true,
  },
  location:{
    type: String,
  },
  interviewDate:{
    type: Date,
  },
  applicationStatus:{
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  user:{
    type: ObjectId,
    ref: "user",
    required: true
  }
  
}, {timestamps:true});

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    trim: true,
    required: [true, 'FirstName is required'],
  },
  lastName:{
    type: String,
    trim: true,
    required: [true, 'LastName is required'],
  },
  email:{
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
    match:[
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please enter valid email'
    ]
  },
  password:{
    type: String,
    trim: true,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must have at least 6 character'],
  },

  jobsHistory: [jobHistorySchema],
  role:{
    type: Number,
    default: 0,
  },
}, {timestamps:true})

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }
  this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enterPassword){
  return await bcrypt.compare(enterPassword, this.password);
}

userSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET,{expiresIn:3600})
}
const user = mongoose.model("user",userSchema);

module.exports = user;