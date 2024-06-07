///////////////                    ///////////////
/////////////////////// IMPORTS ///////////////////////
//////////////                    ///////////////
import "@babel/polyfill";
import {
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateUser,
  updatePassword,
} from "./login.js";

import { submitNewArticleJs } from "./newArticle.js";
import { editPage } from "./editArticle.js";
import { deleteThisArticle } from "./deleteArticle.js";

///////////////                    ///////////////
/////////////////////// HTML ELEMENTS ///////////////////////
//////////////                    ///////////////
const loginForm = document.querySelector(".form--login");
const logoutButton = document.querySelector(".logoutButton");
const newArticleForm = document.getElementById("newArticle");
const deleteArticle = document.querySelector(".deleteArticle");
const editArticle = document.querySelector(".editArticle");
const forgotPasswordbtn = document.querySelector(".forgotPassword");
const resetPasswordform = document.querySelector(".resetPasswordForm");
const updateUserForm = document.querySelector(".updateUser");
const updatePasswordForm = document.querySelector(".updatePassword");
let title = document.getElementById("title");
let summary = document.getElementById("summary");
let imageCover = document.getElementById("imageCover");
let category = document.getElementById("category");
let article = document.getElementById("article");
let authorName = document.getElementById("authorName");
let imageCaption = document.getElementById("imageCaption");
let subheading = document.getElementById("subheading");
///////////////                    ///////////////
/////////////////////// ACTIONS IMPLEMENTATIONS ///////////////////////
//////////////                    ///////////////
//LOGIN
if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("yea!");
    login(email, password);
  });
///////Submit new article
if (newArticleForm)
  newArticleForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("imageCover", imageCover.files[0]);
    form.append("imageCaption", imageCaption.value);
    form.append("title", title.value);
    form.append("subheading", subheading.value);
    form.append("authorName", authorName.value);
    form.append("category", category.value);
    form.append("article", article.value);
    form.append("summary", summary.value);
    console.log("eddai dio cane");
    submitNewArticleJs(form);
  });
//////LOG OUT
if (logoutButton) logoutButton.addEventListener("click", logout);
/////// EDIT ARTICLE
if (editArticle)
  editArticle.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("imageCover", imageCover.files[0]);
    form.append("imageCaption", imageCaption.value);
    form.append("title", title.value);
    form.append("subheading", subheading.value);
    form.append("authorName", authorName.value);
    form.append("category", category.value);
    form.append("article", article.value);
    form.append("summary", summary.value);
    editPage(form);
    console.log("eddai");
  });
/////DELETE ARTICLE
if (deleteArticle) deleteArticle.addEventListener("click", deleteThisArticle);
////FORGOT PASSWORD
//
if (forgotPasswordbtn)
  forgotPasswordbtn.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailToForget").value;
    console.log("yes");
    forgotPassword(email);
  });
///RESET PASSWORD
if (resetPasswordform)
  resetPasswordform.addEventListener("submit", (e) => {
    e.preventDefault();
    const passwordReset = document.getElementById("passwordReset").value;
    const passwordConfirmReset = document.getElementById(
      "passwordConfirmReset",
    ).value;
    resetPassword(passwordReset, passwordConfirmReset);
  });
/////UPDATE USER
if (updateUserForm)
  updateUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameUpdate = document.getElementById("nameUpdate").value;
    const emailUpdate = document.getElementById("emailUpdate").value;
    updateUser(nameUpdate, emailUpdate);
  });
if (updatePasswordForm)
  updatePasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("passwordCurrent").value;
    const passwordNew = document.getElementById("passwordNew").value;
    const passwordNewConfirm =
      document.getElementById("passwordNewConfirm").value;
    console.log("ciao");
    updatePassword(currentPassword, passwordNew, passwordNewConfirm);
  });
