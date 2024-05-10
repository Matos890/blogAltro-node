
import { login } from './login.js';

const loginForm = document.querySelector('.form--login');
const btn = document.querySelector('.btn--green');

if(loginForm)
loginForm.addEventListener('submit', e =>{
e.preventDefault()
const email = document.getElementById('email').value;
const password = document.getElementById('password').value
console.log('yea!');
login(email, password)})
btn.addEventListener('click', function(){
    console.log('evvai')
})