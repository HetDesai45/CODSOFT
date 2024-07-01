const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const { configDotenv } = require("dotenv");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const jobTypeRouter = require("./routes/jobTypeRoutes");
const jobRouter = require("./routes/jobsRoutes");
mongoose.connect(process.env.DATABASE)
.then(()=>console.log("Database connected"))
.catch((err)=>console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(errorHandler);
app.use("/",authRouter);
app.use("/",userRouter);
app.use("/", jobTypeRouter);
app.use("/", jobRouter);

const port = process.env.PORT || 8000;

app.listen(port,()=>console.log(`Serrver Running ${port}`));
