
//API ROUTES
const express = require("express");
const userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js")
const router = express.Router();
router.get("/", userController.getAllUsers);
router.post("/signup", authController.signup);
router.post("/login", authController.login)
module.exports = router;

