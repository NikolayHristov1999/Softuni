import { login } from "../api/data.js";

const section = document.getElementById('loginPage');
section.remove();

let context = null;
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);


export async function showLoginPage(ctx){
    context = ctx;
    ctx.showSection(section);
}

async function onLogin(event){
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    await login(email, password);

    form.reset();
    context.goTo('home');
    context.updateNav();
}