import { byId, edit } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const editTemplate = (album, onEdit) => html`
<section class="editPage">
    <form @submit=${onEdit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" .value=${album.name}>

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${album.imgUrl}>

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" .value=${album.price}>

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${album.releaseDate}>

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" .value=${album.artist}>

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" .value=${album.genre}>

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10" cols="10" .value=${album.description}></textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>
`


export async function editPage(ctx) {
    const userData = getUserData();
    if (userData == null) {
        ctx.page.redirect('/login');
    }
    const album = await byId(ctx.params.id);
    if (userData.id != album._ownerId){
        return alert('Unauthorized');
    }
    ctx.render(editTemplate(album, onEdit));

    async function onEdit(event) {
        event.preventDefault();
        const formData = [...(new FormData(event.target)).entries()];
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

        const missing = formData.filter(([k, v]) => v == '');
        try {
            if (missing.length > 0) {
                throw new Error('Please fill all required fields')
            }
            await edit(ctx.params.id, data);
            ctx.page.redirect('/catalog');

        } catch (err) {
            return alert(err.message);
        }
    }
}