import { deleteMeme, getMemeById } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (itemPromise) => html`
<section id="meme-details">
    ${until(itemPromise, html`<h1>Loading...</h1>`)}
</section>
`

const card = (item, onDelete, isOwner) => html`
<h1>Meme Title: ${item.title}</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${item.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${item.description}</p>
        ${isOwner 
        ? html`
            <a class="button warning" href="/edit/${item._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>`
        : null}
    </div>
</div>`

export function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadMeme(ctx.params.id, onDelete)));
    async function onDelete() {
        await deleteMeme(ctx.params.id);
        ctx.page.redirect('/memes');
    }
}

async function loadMeme(id, onDelete) {
    const userData = getUserData();
    const item = await getMemeById(id);
    let isOwner = false;
    if (userData != null) {
        isOwner = item._ownerId == userData.id;
    }

    return card(item, onDelete, isOwner);
}