
import { login, logout } from './login.js';
import {submitNewArticleJs} from './newArticle.js'

const loginForm = document.querySelector('.form--login');
const logoutButton = document.querySelector('.logoutButton')
const newArticleForm = document.getElementById('newArticle');
const editArticle = document.querySelector('.editArticle');
	let title = document.getElementById('title');
	let summary = document.getElementById('summary');
	let imageCover = document.getElementById('imageCover');
	let category = document.getElementById('category');
	let article = document.getElementById('article');
if(loginForm)
loginForm.addEventListener('submit', e =>{
e.preventDefault()
const email = document.getElementById('email').value;
const password = document.getElementById('password').value
console.log('yea!');
login(email, password)})
if(newArticleForm)
newArticleForm.addEventListener('submit', e=>{
	e.preventDefault()
	 imageCover = imageCover.value
	 title = title.value;
	 category = category.value;
	 article = article.value;
	 summary = summary.value;
     console.log('eddai dio cane')
	submitNewArticleJs(imageCover,title,category,article,summary );


})
 if(logoutButton)
	logoutButton.addEventListener("click", logout)
