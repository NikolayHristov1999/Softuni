import { getAllFurniture, getMyItems } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../utility.js';

const catalogTemplate = (furniturePromise) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${until(furniturePromise, html`<p>Loading &hellip;</p>`)}
</div>`

const myCatalogTemplate = (furniturePromise) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>My furniture</h1>
        <p>This is a list of your publications</p>
    </div>
</div>
<div class="row space-top">
    ${until(furniturePromise, html`<p>Loading &hellip;</p>`)}
</div>`

const furnitureTemplate = (item) => html`<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src="${item.img}" />
            <p>${item.description}</p>
            <footer>
                <p>Price: <span>${item.price} $</span></p>
            </footer>
            <div>
                <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`

export function catalogPage(ctx, next) {
    ctx.render(catalogTemplate(loadItems()));
}

export function myCatalogPage(ctx, next) {
    const userData = getUserData();
    if (userData == null){
        ctx.page.redirect('/login');
        return;
    } 

    ctx.render(myCatalogTemplate(loadItems(userData.id)));
}

async function loadItems(id) {
    if (id == null) {
        let furnituresData = await getAllFurniture();
        return furnituresData.map(item => furnitureTemplate(item));
    } else {
        let furnituresData = await getMyItems(id);
        return furnituresData.map(item => furnitureTemplate(item));
    }
}