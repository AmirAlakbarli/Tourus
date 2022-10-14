const GlobalError = require("./GlobalError");

function sendDevError(err, req, res) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err,
    message: err.message,
    code: statusCode,
    stack: err.stack,
  });
}

function sendProdError(err, req, res) {
  if (err.Operational) {
    res.json({ success: false, message: err.message });
  } else {
    res.json({
      success: false,
      message: "Ops, something went wrong",
    });
  }
}

function handleDublicateError(err) {
  return new GlobalError("This value must be unique!", 400);
}

function handleCastError(err) {
  return new GlobalError("Id must be ObjectId type!", 400);
}

function handleValidationError(err) {
  const allErr = Object.values(err.errors).join(" ");
  return new GlobalError(allErr, 400);
}

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV == "development") {
    sendDevError(err, req, res);
  } else if (process.env.NODE_ENV == "production") {
    if (err.code === 11000) {
      err = handleDublicateError(err);
    } else if (err.name === "CastError") {
      err = handleCastError(err);
    } else if (err.name === "ValidationError") {
      err = handleValidationError(err);
    }
    sendProdError(err, req, res);
  }

  res.status(statusCode).json({ success: false, message: err.message });
};
