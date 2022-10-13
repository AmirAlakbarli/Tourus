const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const errorHandler = require("./error/errorHandler");
const GlobalError = require("./error/GlobalError");

//! Routers
const tourRouter = require("./routes/tourRouter");

//! Initializing the App
const app = express();

//! Third party middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//! Build in Middleware
app.use(express.json());

//! Routers
app.use("/api/v1/tours", tourRouter);

//! Any request with non existing endpoint
app.use((req, res, next) => {
  const message = new Error(`The ${req.originalUrl} does not exist!`);
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
