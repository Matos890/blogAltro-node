const express = require("express");
const articleController = require("../controllers/articleController.js");
const router = express.Router();
router
  .route("/")
  .get(articleController.getAllArticles)
  .post(articleController.createArticle);
router.delete("/:id", articleController.deleteArticle)
module.exports = router
