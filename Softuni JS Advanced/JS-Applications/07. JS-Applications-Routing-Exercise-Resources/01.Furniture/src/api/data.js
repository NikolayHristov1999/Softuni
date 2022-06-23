import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const urlTargets = {
    all: '/data/catalog',
    byId: '/data/catalog/',
    myItems: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
    create: '/data/catalog',
    edit: '/data/catalog/',
    delete: '/data/catalog/'
}

export async function getAllFurniture(){
    return await api.get(urlTargets.all);
}

export async function getFurnitureById(id){
    return await api.get(urlTargets.byId + id);
}

export async function getMyItems(userId){
    return await api.get(`/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function createItem(item){
    return await api.post(urlTargets.create, item);
}

export async function editItem(id, data){
    return await api.put(urlTargets.edit + id, data)
}

export async function deleteItem(id){
    return await api.del(urlTargets.delete + id)
}