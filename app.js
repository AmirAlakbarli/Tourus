const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const errorHandler = require("./src/errors/errorHandler");
const GlobalError = require("./src/errors/GlobalError");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

//! Routers
const tourRouter = require("./src/routes/tourRouter");
const userRouter = require("./src/routes/userRouter");
const reviewRouter = require("./src/routes/reviewRouter");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//! Initializing the App
const app = express();

//! Set limit for requests per window
app.use(limiter);

//! Make header more secure than regular
app.use(helmet());

//! Third party middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//! Build in Middleware
app.use(express.json());

//! api for routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

//! Any request with non existing endpoint
app.use((req, res, next) => {
  const message = new GlobalError(`The ${req.originalUrl} does not exist!`);
  next(message);
});

//! Any error with api
app.use(errorHandler);

//! define PORT number
const PORT = process.env.PORT || 5000;

//! Connect to Database
const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, (err) => {
  if (err) return console.log("Error occured");
  console.log("MongoDB connected");
  //! Running the server
  app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
});
