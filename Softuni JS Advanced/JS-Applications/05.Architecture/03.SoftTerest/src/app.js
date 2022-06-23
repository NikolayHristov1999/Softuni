import { logout } from "./api/data.js";
import { showSection } from "./dom.js";
import { showCatalogPage } from "./views/catalog.js";
import { showCreatePage } from "./views/create.js";
import { showDetailsPage } from "./views/details.js";
import { showHomePage } from "./views/home.js";
import { showLoginPage } from "./views/login.js";
import { showRegisterPage } from "./views/register.js";

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);
nav.querySelector('#logoutBtn').addEventListener('click',async (event) => {
    event.preventDefault();
    await logout();
    updateNav();
})

const links = {
    'homeLink': 'home',
    'getStartedLink': 'home',
    'catalogLink': 'catalog',
    'loginLink': 'login',
    'registerLink': 'register',
    'createLink': 'create'
};

const views = {
    'home' : showHomePage,
    'catalog' :showCatalogPage,
    'login':showLoginPage,
    'register':showRegisterPage,
    'create':showCreatePage,
    'details':showDetailsPage
}

const ctx = {
    goTo,
    showSection,
    updateNav
}

function onNavigate(event){
    const name = links[event.target.id];

    if(name){
        event.preventDefault();
        goTo(name);
    }
}

//Start in home view
updateNav();
goTo('home');

function goTo(name, ...params){
    const view = views[name];
    if (typeof view == 'function'){ 
        view(ctx, ...params);
    }
}

function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null){
        [...nav.querySelectorAll('.guest')].forEach(el => el.style.display = 'none');
        [...nav.querySelectorAll('.user')].forEach(el => el.style.display = 'block');
    } else {
        [...nav.querySelectorAll('.user')].forEach(el => el.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(el => el.style.display = 'block');
    }
}