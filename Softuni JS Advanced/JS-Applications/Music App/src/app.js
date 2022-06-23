import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";

const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    updateUserNav();
    page.redirect('/');
})

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content => render(content, root));
    ctx.updateUserNav = updateUserNav
    next();
}

updateUserNav();
function updateUserNav() {
    const userData = getUserData();
    if (userData == null) {
        const guestEl = document.querySelectorAll(".guest");
        for (const el of guestEl){
            el.style.display = "none";
        }
        const userEl = document.querySelectorAll(".user");
        for (const el of userEl){
            el.style.display = "inline";
        }
    } else {
        const guestEl = document.querySelectorAll(".guest");
        for (const el of guestEl){
            el.style.display = "inline";
        }
        const userEl = document.querySelectorAll(".user");
        for (const el of userEl){
            el.style.display = "none";

        }
    }
}