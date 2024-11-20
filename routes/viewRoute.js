const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

// Rotte pubbliche
router.get("/", viewController.getOverview);

router.get(
  "/articles/:category/:slug",
  authController.isLoggedIn,
  viewController.getArticle
);

router
  .route("/users/signup")
  .get(viewController.viewSignUpPage)
  .post(authController.signup);

router
  .route("/users/login")
  .get(viewController.viewLoginPage);

// Middleware globale per rotte protette

// Rotte protette per la gestione degli articoli
router.get(
  "/protected/new",
  authController.restrict("admin", "writer"),
  viewController.newArticle
);

router.get("/protected/updateUser", viewController.getUpdateUser);

router.get(
  "/protected/edit/:slug",
  viewController.getEditPage
);

router.patch("/protected/edit/:slug", viewController.editArticle);

router.delete(
  "/articles/:category/:slug",
  authController.restrict("admin"),
  viewController.deleteArticle
);

// Gestione della password
router.get("/protected/forgotPassword", viewController.getPasswordForgot);

router.get("/protected/resetPassword/:token", viewController.getResetPassword);

module.exports = router;
