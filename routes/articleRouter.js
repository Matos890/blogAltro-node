const express = require("express");
const articleController = require("../controllers/articleController.js");
const viewController = require("../controllers/viewController.js")
const authController = require("../controllers/authController.js")
const router = express.Router();
router
  .route("/")
  .get(articleController.getAllArticles)
router.use( authController.protect, authController.isLoggedIn)
router.route("/submit-new-article").post(authController.restrict("writer", "admin"),articleController.createArticle);
router.delete("/:id", articleController.deleteArticle)
module.exports = router
