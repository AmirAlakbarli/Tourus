const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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

    role: {
      type: String,
      enum: ["user", "admin", "guide"],
      default: "user",
    },

    password: {
      type: String,
      required: [true, "Please enter a password!"],
      select: false,
    },

    forgetPassword: String,
    resetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  realPassword,
  cryptedPassword
) {
  return await bcrypt.compare(realPassword, cryptedPassword);
};

userSchema.methods.generatePassToken = async function () {
  const resetToken = crypto.randomBytes(48).toString("hex");
  this.forgetPassword = await bcrypt.hash(resetToken, 16);
  this.resetExpires = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
