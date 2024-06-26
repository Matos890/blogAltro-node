//  ROUTES TO RENDER

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
  .get(authController.isLoggedIn, viewController.viewLoginPage)
  .post(authController.login);
//HANDLING OF ARTICLES
router.use(authController.protect);
router.get(
  "/protected/new",
  authController.restrict("admin", "writer"),
  viewController.newArticle,
);
router.post("/protected/submit-new-article", viewController.submitNewArticle);
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
