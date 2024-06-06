const express = require("express");
const articleController = require("../controllers/articleController.js");
const viewController = require("../controllers/viewController.js")
const authController = require("../controllers/authController.js")
const router = express.Router();
router
  .route("/")
  .get(articleController.getAllArticles)
router.use(  authController.isLoggedIn, authController.protect)

router.route("/submit-new-article").post(authController.restrict("writer", "admin"),articleController.uploadArticleImage, articleController.resizeArticlePhoto, articleController.createArticle);
router.delete("/:slug", articleController.deleteArticle)
router.get("/articles/:category/:slug", viewController.getArticle

)
router.patch("/edit/:slug",  articleController.updateArticle)
module.exports = router
