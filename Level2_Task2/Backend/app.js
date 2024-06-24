const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const { configDotenv } = require("dotenv");
require("dotenv").config();

mongoose.connect(process.env.DATABASE)
.then(()=>console.log("Database connected"))
.catch(()=>console.log("Connection error"));

const port = process.env.PORT || 8000;

app.listen(port,()=>console.log(`Serrver Running ${port}`));
