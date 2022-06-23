
import { showView } from "./dom.js";
import { showLogin } from "./login.js";

//detach section from DOM
const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.remove();


async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');

    if (password != rePass || email == "") {
        alert('All inputs should be filled correctly');
        return;
    }

    const res = await register({email, password});

    if (res.ok != true) {
        alert('Something went wrong please try again');
        return;
    }
    showLogin();
}

async function register(user) {
    const res = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return res;
}
//display logic
export function showRegister() {
    showView(section);
}
