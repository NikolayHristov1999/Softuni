const tbody = document.querySelector('tbody');
const createForm = document.querySelector('form');
const editForm = document.getElementById('editForm');
editForm.style.display = 'none';

function attachEvents() {
    document.getElementById('loadBooks').addEventListener('click', loadBooks);
    createForm.addEventListener('submit', onSubmit);
    editForm.addEventListener('submit', onEdit)
    tbody.addEventListener('click', onTableClick);
    loadBooks();
}

async function onTableClick(e){
    if(e.target.textContent == 'Delete'){
        const result = await onDelete(e.target);
    } else if(e.target.textContent == 'Edit'){
        onEditButtonClick(e.target);
    }
}

async function onEditButtonClick(button){
    const id = button.parentElement.dataset.id;
    
    const book = await loadBookById(id);
    createForm.style.display = 'none';
    editForm.style.display = 'block';
    
    editForm.setAttribute('data-id', id);
    editForm.querySelector('[name="title"]').value = book.title;
    editForm.querySelector('[name="author"]').value = book.author;
}

async function onEdit(e){
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get('title');
    const author = formData.get('author');
    if (title == "" || author == "") {
        return;
    }
    const result = await editBook({ title, author }, e.target.dataset.id);
    loadBooks();
}

async function onDelete(button){
    const result = await deleteBook(button.parentElement.dataset.id);
    
    loadBooks();
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get('title');
    const author = formData.get('author');
    if (title == "" || author == "") {
        return;
    }

    const result = await createBook({ title, author });
    const id = (await result.json())._id;
    appendBook(title, author, id);

}
async function loadBookById(id){
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const data = await fetch(url);
    const book = await data.json();
    return book;
}

async function loadBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const data = await fetch(url);

    if (data.ok != true) {
        console.log(data.status);
        return;
    }

    const json = await data.json();
    tbody.replaceChildren();
    for (let key in json) {
        appendBook(json[key].title, json[key].author, key);
    }
}

function appendBook(title, author, id) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${title}</td>
    <td>${author}</td>
    <td data-id="${id}">
        <button>Edit</button>
        <button>Delete</button>
    </td>`;
    tbody.appendChild(tr);
}

async function createBook(book) {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(book)
    });

    return res;
}

async function editBook(book, id){
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const res = await fetch(url , {
        method: 'put',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(book)
    });

    return res;
}

async function deleteBook(id){
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const res = await fetch(url , {
        method: 'delete'
    });

    return res;
}
attachEvents();