
import { search } from "../api/data.js";
import { html, render } from "../lib.js";
import { getUserData } from "../util.js";

const searchTemplate = (onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="search-result">

    </div>
</section>`


const searchResultTemplate = (albums, isLoggedIn) => html`
<!--Show after click Search button-->
    ${albums.length > 0
    ? albums.map(album => albumTemplate(album, isLoggedIn))
    : html`<p class="no-result">No result.</p>`}
`

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
        ? html`
        <div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>`
        : null}
    </div >
</div > `

export function searchPage(ctx) {
    ctx.render(searchTemplate(onSearch));

    async function onSearch(event) {
        event.preventDefault();
        const searchText = document.getElementById('search-input').value;
        if (searchText == "") {
            return alert('Fill in the input search for results');
        }
        const isLoggedIn = getUserData() != null;
        const albums = await search(searchText);
        render(searchResultTemplate(albums, isLoggedIn), document.querySelector('#searchPage .search-result'));
    }
}