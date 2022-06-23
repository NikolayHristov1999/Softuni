import { html, render } from '../node_modules/lit-html/lit-html.js';
import { del, get, post, put } from './api.js';
import { until } from '../node_modules/lit-html/directives/until.js';

export {
    html,
    render,
    until
}

export async function getBooks() {
    const books = get('http://localhost:3030/jsonstore/collections/books');
    return books;
}

export async function getBookById(id) {
    return get('http://localhost:3030/jsonstore/collections/books/' + id)
}

export async function createBook(book) {
    return post('http://localhost:3030/jsonstore/collections/books', book);
}

export async function editBook(book, id) {
    return put('http://localhost:3030/jsonstore/collections/books/' + id, book);
}

export async function deleteBook(id) {
    return del('http://localhost:3030/jsonstore/collections/books/' + id);
}
