import { editMeme, getMemeById } from '../api/data.js';
import { html, until } from '../lib.js';
import { notify } from '../notify.js';
import { getUserData } from '../util.js';

const editTemplate = (itemPromise) => html`
<section id="edit-meme">
    ${until(itemPromise, html`<h1>Loading...</h1>`)}
</section>`

const editForm = (item, onEdit) => html`
<form @submit=${onEdit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${item.title}>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"
            .value=${item.description}></textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${item.imageUrl}>
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>`

export function editPage(ctx) {
    ctx.render(editTemplate(loadData(ctx.params.id)));

    async function loadData(id) {
        const userData = getUserData();
        const item = await getMemeById(id);
        if (userData == null || userData.id != item._ownerId){
            notify('You are not authorized to edit this item');
            ctx.page.redirect('/memes');
        }
        return editForm(item, onEdit);
    }

    async function onEdit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();

        if (title == "" || description == "" || imageUrl == ""){
            notify('All fields required');
            return;
        }
        editMeme(ctx.params.id, {title, description, imageUrl});
        ctx.page.redirect('/details/' + ctx.params.id );
    }
}
