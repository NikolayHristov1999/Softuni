window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', onSubmit);
});

async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');

    const res = await login({ email, password });
}

async function login(loginData) {
    const url = 'http://localhost:3030/users/login';
    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message)
        }

        const data = await res.json();
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }
        sessionStorage.setItem('userData',JSON.stringify(userData))

        window.location = './index.html'
    } catch (err){
        alert(err.message);
    }

}