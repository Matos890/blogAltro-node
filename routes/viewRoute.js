//  ROUTES TO RENDER

const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

const router = express.Router();
//HOMEPAGE AND ARTICLES ROUTES
router.get("/",  viewController.getOverview);
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
router.use(authController.isLoggedIn, authController.protect)
router.get(
  "/protected/new",
  authController.restrict("admin", "writer"),
  viewController.newArticle,
);
router.get('/protected/updateUser',viewController.getUpdateUser)
router.use(authController.isLoggedIn)
router.get(
  "/protected/edit/:slug",
  viewController.getEditPage,
	
);
router.patch("/protected/edit/:slug", viewController.editArticle);
router.delete(
  "/articles/:category/:slug",
  authController.restrict("admin"),
  viewController.deleteArticle,
);
router.get("/protected/forgotPassword", viewController.getPasswordForgot)
router.get("/protected/resetPassword/:token", viewController.getResetPassword)
module.exports = router;
// ciao ciao
