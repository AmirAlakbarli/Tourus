const GlobalError = require("../error/GlobalError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const asyncCatch = require("../utils/asyncCatch");
const User = require("../model/user");

const privateRoute = asyncCatch(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new GlobalError("There isn't token!"));
  const verifyPromise = promisify(jwt.verify);

  const userInfo = await verifyPromise(token, process.env.JWT_SIGNATURE);
  const user = await User.findById(userInfo.id);

  next();
});

module.exports = { privateRoute };
