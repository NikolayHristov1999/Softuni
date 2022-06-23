import { showCreate } from "./create.js";
import { showDetails } from "./details.js";
import { showEdit } from "./edit.js";
import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";


//views for the right clicked navigation 
const views = {
    'home-link': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
}

//navigation
const navigation = document.querySelector('nav');

navigation.querySelector('#logoutBtn').addEventListener('click', onLogout);
navigation.addEventListener('click', (event) => {
    const view = views[event.target.id];
    if (typeof view == 'function') {
        event.preventDefault();
        view();
    }
});


async function onLogout(event){
    event.preventDefault();
    event.stopImmediatePropagation();

    const {token} = JSON.parse(sessionStorage.getItem('userData'));

    await fetch('http://localhost:3030/users/logout',{
        headers:{
            'X-Authorization': token
        }
    });

    sessionStorage.removeItem('userData');
    showLogin();
    updateNav();
    
}
export function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null){
        [...navigation.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...navigation.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
        navigation.querySelector('#welcome-msg').textContent = "Welcome, " + userData.email;
    } else{
        [...navigation.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...navigation.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}
updateNav();
showHome();
