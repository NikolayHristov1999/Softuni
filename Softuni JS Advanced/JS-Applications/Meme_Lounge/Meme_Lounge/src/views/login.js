import { login } from '../api/data.js';
import { html } from '../lib.js';
import { notify } from '../notify.js';

const loginTemplate = (onLogin) => html`
<section id="login">
    <form @submit=${onLogin} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="#">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`

export function loginPage(ctx) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        if(password == "" || email == ""){
            notify('Email or password don\'t match');
            return;
        }
        await login(email, password);
        event.target.reset();
        ctx.updateUserNav();
        ctx.page.redirect('/memes');
    }
}
