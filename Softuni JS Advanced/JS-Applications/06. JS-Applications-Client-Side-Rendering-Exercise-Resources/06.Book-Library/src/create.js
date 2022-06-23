import { createBook, html } from './utility.js'

const createTemplate = (onSuccess) => html`
<form id="add-form" @submit=${ev => onSubmit(ev, onSuccess)}>
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`

export function showCreate(ctx){
    if (ctx.book != undefined){
        return null;
    }
    return createTemplate(ctx.update);
}

async function onSubmit(event, onSuccess){
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');

    await createBook({title, author});
    event.target.reset();
    onSuccess();
}