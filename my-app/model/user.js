const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name!"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      requires: true,
      validate: [validator.isEmail, "Please enter a correct email"],
    },

    photo: String,

    password: {
      type: String,
      required: [true, "Please enter a password!"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm password!"],
      validate: {
        validator: function (passwordConfirm) {
          return passwordConfirm === this.password;
        },
        message: "Please sure confirming password is same as password",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (realPassword, cryptedPassword) {
  return await bcrypt.compare(realPassword, cryptedPassword);
};
const User = mongoose.model("user", userSchema);
module.exports = User;
