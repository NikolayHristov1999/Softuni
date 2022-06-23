import { editBook, html} from './utility.js'

const editTemplate = (book, onSuccess) => html`
<form id="edit-form" @submit=${ev => onSubmit(ev, onSuccess)}>
    <input type="hidden" name="id" .value=${book._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>`;


export function showEdit(ctx){
    console.log(ctx)
    if (ctx.book == undefined){
        return null;
    }
    return editTemplate(ctx.book, ctx.update);
}

async function onSubmit(event, onSuccess){
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const title = formData.get('title');
    const author = formData.get('author');

    await editBook({title, author}, id);
    event.target.reset();
    onSuccess();
}