
//API ROUTES
const express = require("express");
const userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js")
const router = express.Router();
router.get("/", userController.getAllUsers);
router.post("/signup", authController.signup);
router.post("/login", authController.login)
router.use(authController.protect)
router.patch("/updateMe/", userController.updateMe)
router.delete("/deleteMe", userController.deleteMe);

module.exports = router;

