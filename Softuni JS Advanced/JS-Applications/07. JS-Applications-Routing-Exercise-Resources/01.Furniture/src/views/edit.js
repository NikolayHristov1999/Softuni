import { editItem, getFurnitureById } from '../api/data.js';
import { html, until } from '../lib.js';

const editTemplate = (itemPromise) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
${until(itemPromise, html`<p>Loading&hellip;</p>`)}
`

const itemTemplate = (item, onSubmit, errorMsg, errors) => html`
<form @submit=${onSubmit}>
    ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${'form-control ' + (errors.make ? ' is-invalid' : null)} id="new-make" type="text"
                    name="make" .value=${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control ' + (errors.model ? ' is-invalid' : null)} id="new-model" type="text"
                    name="model" .value=${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${'form-control ' + (errors.year ? ' is-invalid' : null)} id="new-year" type="number"
                    name="year" .value=${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${'form-control ' + (errors.description ? ' is-invalid' : null)} id="new-description"
                    type="text" name="description" .value=${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${'form-control ' + (errors.price ? ' is-invalid' : null)} id="new-price" type="number"
                    name="price" .value=${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${'form-control ' + (errors.img ? ' is-invalid' : null)} id="new-image" type="text"
                    name="img" .value=${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`

export function editPage(ctx) {
    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(editTemplate(loadItem(ctx.params.id, onEdit, errorMsg, errors)));
    }

    async function onEdit(event) {
        event.preventDefault();
        const formData = [...(new FormData(event.target)).entries()];
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

        const missing = formData.filter(([k, v]) => k != 'material' && v == '');
        try {
            if (missing.length > 0) {
                const errors = missing.reduce((a, [k]) => Object.assign(a, { [k]: true }), {});
                throw {
                    error: new Error('Please fill all required fields'),
                    errors
                }
            }
            data.year = Number(data.year);
            data.price = Number(data.price);

            if (data.year == undefined || data.price == undefined) {
                const errors = { year: true, price: true };
                throw {
                    error: new Error('Year and price should be valid numbers'),
                    errors
                }
            }

            await editItem(ctx.params.id, data);
            ctx.page.redirect('/details/' + ctx.params.id);

        } catch (err) {
            const message = err.message || err.error.message;
            update(message, err.errors || {})
        }
    }
}

async function loadItem(id, onEdit, errorMsg, errors) {
    console.log(id)
    const item = await getFurnitureById(id);
    return itemTemplate(item, onEdit, errorMsg, errors);
}