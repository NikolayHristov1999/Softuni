window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onSubmit);
});

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatedPass = formData.get('rePass');

    try {
        if (password == repeatedPass && password != "") {
            const res = await register({ email, password });
            window.location = './login.html';
        } else{
            throw new Error('passwords do not match');
        }
    }
    catch(err){
        alert(err.message);
    }

}

async function register(userData) {
    const url = 'http://localhost:3030/users/register';
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return res;
}