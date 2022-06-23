import { getAll } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const catalogTemplate = (albums, isLoggedIn) => html`<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length > 0 
    ? albums.map(album => albumTemplate(album, isLoggedIn))
    : html`<p>No Albums in Catalog!</p>`}
</section>`

const albumTemplate = (album, isLoggedIn) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: ${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isLoggedIn
        ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>`
        : null}
    </div>
</div>
`


export async function catalogPage(ctx) {
    const albums = await getAll();
    const isLoggedIn = getUserData() != null;

    ctx.render(catalogTemplate(albums, isLoggedIn));
}

