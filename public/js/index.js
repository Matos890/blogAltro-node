
///////////////                    ///////////////
/////////////////////// IMPORTS ///////////////////////
//////////////                    ///////////////
import { login, logout, forgotPassword, resetPassword } from "./login.js";
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
const forgotPasswordbtn = document.querySelector('.forgotPassword')
const resetPasswordform = document.querySelector('.resetPasswordForm')
let title = document.getElementById("title");
let summary = document.getElementById("summary");
let imageCover = document.getElementById("imageCover");
let category = document.getElementById("category");
let article = document.getElementById("article");
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
    imageCover = imageCover.value;
    title = title.value;
    category = category.value;
    article = article.value;
    summary = summary.value;
    console.log("eddai dio cane");
    submitNewArticleJs(imageCover, title, category, article, summary);
  });
//////LOG OUT
if (logoutButton) logoutButton.addEventListener("click", logout);
/////// EDIT ARTICLE
if (editArticle)
  editArticle.addEventListener("submit", (e) => {
    e.preventDefault();
    imageCover = imageCover.value;
    title = title.value;
    category = category.value;
    article = article.value;
    summary = summary.value;
    editPage(imageCover, title, category, article, summary);
    console.log("eddai");
  });
/////DELETE ARTICLE
if (deleteArticle) deleteArticle.addEventListener("click", deleteThisArticle);
////FORGOT PASSWORD
//
if(forgotPasswordbtn)
	forgotPasswordbtn.addEventListener('submit', (e)=>{
		e.preventDefault();
		const email = document.getElementById("emailToForget").value;
		console.log('yes');
forgotPassword(email);
	} )
///RESET PASSWORD
if(resetPasswordform)
	resetPasswordform.addEventListener('submit', (e)=>{
		e.preventDefault();
		const passwordReset = document.getElementById("passwordReset").value;
		const passwordConfirmReset = document.getElementById('passwordConfirmReset').value;
		resetPassword(passwordReset, passwordConfirmReset)
	})
