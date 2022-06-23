import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endPoints = {
    getAll: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/albums',
    byId: '/data/albums/',
    deleteById: '/data/albums/',
    edit: '/data/albums/',
    search: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`,
}

export async function getAll() {
    return api.get(endPoints.getAll);
}

export async function byId(id) {
    return api.get(endPoints.byId + id);
}

export async function deleteById(id) {
    return api.del(endPoints.deleteById + id);
}

export async function create(album) {
    return api.post(endPoints.create, album);
}

export async function edit(id, book) {
    return api.put(endPoints.edit + id, book);
}

export async function search(query) {
    return api.get(endPoints.search(query));
}