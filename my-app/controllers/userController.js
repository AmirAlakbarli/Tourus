const asyncCatch = require("../utils/asyncCatch");
const GlobalError = require("../errors/GlobalError");
const User = require("../models/user");

exports.changeUserData = asyncCatch(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    email: req.body.email,
  });

  res.status(200).json({ success: true, user });
});
