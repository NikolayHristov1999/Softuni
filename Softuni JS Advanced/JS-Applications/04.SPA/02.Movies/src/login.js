import { updateNav } from "./app.js";
import { showView } from "./dom.js";
import { showHome } from "./home.js";

//detach section from DOM
const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.remove();


async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok != true){
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }));
        form.reset();
        updateNav();
        showHome();
    } catch(err) {
        alert(err.message);
    }
}
//display logic
export function showLogin() {
    showView(section);
}
