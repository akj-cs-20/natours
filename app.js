const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

//  serve-static files
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

// routing in express
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Server
module.exports = app;
