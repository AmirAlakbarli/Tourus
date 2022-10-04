const express = require("express");
const morgan = require("morgan");

//! Routers
const tourRouter = require("./routes/tourRouter");

//! Initializing the App
const app = express();

//! Third party middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//! Build in Middleware
app.use(express.json());

app.use("/api/v1/tours", tourRouter);

//! Running the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
