import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endPoints = {
    getAll: '/data/books?sortBy=_createdOn%20desc',
    create: '/data/books',
    byId: '/data/books/',
    deleteById: '/data/books/',
    edit: '/data/books/',
    like: '/data/likes',
    totalLikes: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    isLikedByUser: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    getMyBooks: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

export async function getAllBooks() {
    return api.get(endPoints.getAll);
}

export async function byId(id) {
    return api.get(endPoints.byId + id);
}

export async function deleteById(id) {
    return api.del(endPoints.deleteById + id);
}

export async function create(book) {
    return api.post(endPoints.create, book);
}

export async function edit(id, book) {
    return api.put(endPoints.edit + id, book);
}

export async function getMyBooks(userId) {
    return api.get(endPoints.getMyBooks(userId));
}

export async function likeBook(bookId) {
    return api.post(endPoints.like, { bookId });
}

export async function getLikes(bookId) {
    return api.get(endPoints.totalLikes(bookId))
}

export async function isLikedByUser(bookId, userId) {
    return api.get(endPoints.isLikedByUser(bookId, userId))
}