import { register } from "../api/data.js";

const section = document.getElementById('registerPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);

let context = null;

export async function showRegisterPage(ctx){
    context = ctx;
    ctx.showSection(section);
}

async function onRegister(event){
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repeatedPass = formData.get('repeatPassword');

    if(password == "" || email == ""){
        return alert('All fields required')
    }
    if(repeatedPass != password ){
        alert('Passwords do not match');
        return;
    }

    await register(email, password);
    
    form.reset();
    context.goTo('home');
    
    context.updateNav();
}