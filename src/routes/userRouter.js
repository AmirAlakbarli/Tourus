const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { privateRoute } = require("../middlewares/privateRoute");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:id/:token", authController.resetPassword);

router.use(privateRoute);
router.get("/userInfo", userController.getUserData);
router.patch("/userInfo", userController.changeUserData);
router.patch("/userInfo/changePassword", authController.changePassword);
router.delete("/userInfo/deleteUser", authController.deleteUser);

module.exports = router;
