//  ROUTES TO RENDER
const app = require('express')
const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");
const router = express.Router();
//HOMEPAGE AND ARTICLES ROUTES
router.get("/", viewController.getOverview);
router.get(
  "/articles/:category/:slug",
  authController.isLoggedIn,
  viewController.getArticle,
);

//CREATION AND HANDLING OF USERS
router
  .route("/users/signup")
  .get(viewController.viewSignUpPage)
  .post(authController.signup);
router
  .route("/users/login")
  .get(authController.isLoggedIn, viewController.viewLoginPage);
//HANDLING OF ARTICLES
router.get(
  "/protected/new",
  authController.isLoggedIn,
  authController.protect,
  authController.restrict("admin", 'writer'),
  viewController.newArticle,
);

router.get(
  "/protected/edit/:slug",
  authController.restrict("admin"),
  viewController.getEditPage,
);
router.patch("/protected/edit/:slug", viewController.editArticle);
router.delete(
  "/articles/:category/:slug",
  authController.restrict("admin"),
  viewController.deleteArticle,
);

module.exports = router;
// ciao ciao
