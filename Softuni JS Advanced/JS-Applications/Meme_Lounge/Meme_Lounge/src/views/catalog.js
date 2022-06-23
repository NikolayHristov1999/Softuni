import { getAllMemes } from '../api/data.js';
import { html, until } from '../lib.js';

const catalogTemplate = (memesPromise) => html`<!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${until(memesPromise, html`<p>Loading&hellip;</p>`)}
    </div>
</section>`

const memeCard = (item) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${item.title}</p>
            <img class="meme-image" alt="meme-img" src=${item.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${item._id}">Details</a>
        </div>
    </div>
</div>`;

const emptyTemplate = () => html`<p class="no-memes">No memes in database.</p>`;

export function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadMemes()));
}

async function loadMemes() {
    const memes = await getAllMemes();
    if (memes.length == 0) {
        return emptyTemplate();
    }
    return memes.map(memeCard);
}