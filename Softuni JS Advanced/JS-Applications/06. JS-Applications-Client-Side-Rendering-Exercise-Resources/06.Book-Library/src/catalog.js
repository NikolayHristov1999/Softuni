import { deleteBook, getBooks, html, until } from './utility.js'

const catalogTemplate = (booksPromise) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${until(booksPromise, html`
        <tr>
            <td colSpan="3">Loading&hellip;</td>
        </tr>`)}
    </tbody>
</table>`

const bookRow = (book, onEdit, onDelete) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${book._id}>
        <button @click=${onEdit}>Edit</button>
        <button @click=${onDelete}>Delete</button>
    </td>
</tr>`


export function showCatalog(ctx) {
    return catalogTemplate(loadBooks(ctx));
}

async function loadBooks(ctx) {
    const books = await getBooks();

    return Object.values(books).map(book => bookRow(book, toggleEditor.bind(null, book, ctx), onDelete.bind(null, book, ctx)));
}

function toggleEditor(book, ctx) {
    ctx.book = book;
    console.log(ctx);
    ctx.update();
}

async function onDelete(book, ctx) {
    if (book._id == undefined) {
        return;
    }
    await deleteBook(book._id);
    ctx.update();
}