import { createMeme } from '../api/data.js';
import { html } from '../lib.js';
import { notify } from '../notify.js';
import { getUserData } from '../util.js';

const createTemplate = (onCreate) => html`
<section id="create-meme">
    <form @submit=${onCreate} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`

export function createPage(ctx) {
    let submitted = false;
    if (getUserData() == null) {
        alert('Please login before creating!')
        ctx.page.redirect('/login');
    }
    ctx.render(createTemplate(onCreate));

    async function onCreate(event) {
        event.preventDefault();
        if(submitted){
            return;
        }
        submitted = true;
        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();

        if (title == "" || description == "" || imageUrl == "") {
            return notify('All fields Required');
        }
        await createMeme({title, description, imageUrl});
        ctx.page.redirect('/memes');

    }
}