import { byId, deleteById, getLikes, isLikedByUser, likeBook } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, onDelete, userId, onLike, likes, isLiked) => html`
<!-- Details Page ( for Guests and Users ) -->
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${userId == book._ownerId 
            ? html`
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a class="button" @click=${onDelete}>Delete</a>`
            : null}
            ${userId != null && userId != book._ownerId && !isLiked ? html`<a @click=${onLike} class="button">Like</a>` : null}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`


export async function detailsPage(ctx) {
    const userData = getUserData();
    const userId = userData != null ? userData.id : null ;
    const [book, likes, isLiked] = await Promise.all([
        byId(ctx.params.id),
        getLikes(ctx.params.id),
        userId ? isLikedByUser(ctx.params.id, userId) : 0
    ]);
    ctx.render(detailsTemplate(book, onDelete, userId, onLike, likes, isLiked));

    async function onDelete(event){
        event.preventDefault();
        await deleteById(ctx.params.id);
        ctx.page.redirect('/');
    }

    async function onLike(event){
        event.preventDefault();
        await likeBook(ctx.params.id);
        
        ctx.page.redirect(ctx.path );
    }

}