const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const { privateRoute } = require("../middleware/privateRoute");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:id/:token", authController.resetPassword);

router.use(privateRoute);
router.patch("/changePassword", authController.changePassword);
router.patch("/", userController.changeUserData);

module.exports = router;
