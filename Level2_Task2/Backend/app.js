const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const jobTypeRouter = require("./routes/jobTypeRoutes");
const jobRouter = require("./routes/jobsRoutes");
const cors = require("cors");
const { checkForAuthentication } = require("./middleware/auth");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkForAuthentication("token"));
app.use(express.json());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", jobTypeRouter);
app.use("/api", jobRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 8000;

app.use(errorHandler);
app.listen(port, () => console.log(`Serrver Running ${port}`));
