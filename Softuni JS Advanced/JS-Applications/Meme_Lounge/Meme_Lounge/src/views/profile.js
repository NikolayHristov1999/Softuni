import { getAllMemes, getMyMemes } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';

const profileTemplate = (memesPromise) => html`
<!-- Profile Page ( Only for logged users ) -->
<section id="user-profile-page" class="user-profile">
    ${until(memesPromise, html`<h1>Loading...</h1>`)}
</section>`


const userMemesTemplate = (userData, items) => html`
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender == 'male' ? 'male.png' : 'female.png'}">
    <div class="user-content">
        <p>Username: ${userData.username}</p>
        <p>Email: ${userData.email}</p>
        <p>My memes count: ${items.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    ${items.length > 0 
    ? items.map(memeCard)
    : html`<p class="no-memes">No memes in database.</p>`}
</div>`;


const memeCard = (item) => html`
<div class="user-meme">
    <p class="user-meme-title">${item.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
    <a class="button" href="/details/${item._id}">Details</a>
</div>`;

export function profilePage(ctx) {
    const userData = getUserData();
    if (userData == null) {
        ctx.page.redirect('login');
        return;
    }
    ctx.render(profileTemplate(loadMemes(userData)));
}

async function loadMemes(userData) {
    const memes = await getMyMemes(userData.id);
    return userMemesTemplate(userData, memes);
}