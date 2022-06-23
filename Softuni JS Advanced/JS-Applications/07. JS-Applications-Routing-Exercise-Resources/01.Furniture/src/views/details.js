import { deleteItem, getFurnitureById } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../utility.js';

const detailsContainer = (itemPromise) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
${until(itemPromise, html`<p>Loading &hellip;</p>`)}
`

const itemTemplate = (item, userId, onDel) => html`
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        ${userId == item._ownerId ? html`
        <div>
            <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
            <a href="" @click=${onDel} class="btn btn-red">Delete</a>
        </div>` : null}
        
    </div>
</div>
`

export function detailsPage(ctx) {
    ctx.render(detailsContainer(loadItem(ctx.params.id, ctx.page)));
}

async function loadItem(id, page) {
    const item = await getFurnitureById(id);
    if (item.img.startsWith('.')) {
        item.img = item.img.substring(1);
    }
    let userId = null;
    const userData = getUserData();
    if(userData != null){
        userId = userData.id;
    }
    return itemTemplate(item, userId, onDelete);

    async function onDelete(event) {
        event.preventDefault();
        await deleteItem(id);
        console.log(page)
        page.redirect('/my-furniture');
    }

}
