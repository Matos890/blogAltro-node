
//API ROUTES
const express = require("express");
const userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js")
const router = express.Router();
router.get("/", userController.getAllUsers);
router.post("/signup", authController.signup);
router.post("/login", authController.login)
router.get("/logout", authController.isLoggedIn, authController.logout)
router.use(authController.protect)
router.patch("/updateMe/", userController.updateMe)
router.delete("/deleteMe", userController.deleteMe);
router.post("/forgot-password", authController.forgotPassword)
router.patch("/resetPassword/:token", authController.resetPassword);
module.exports = router;

