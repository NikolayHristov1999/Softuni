import { showDetails } from "./details.js";
import { showView } from "./dom.js";
import { showHome } from "./home.js";

//detach section from DOM
const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit)

section.remove();

//display logic
export function showEdit(movieId) {
    getMovie(movieId);
    showView(section);
}

async function getMovie(id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const response = await fetch('http://localhost:3030/data/movies/' + id);
    if (response.ok != true) {
        alert('Movie not found!');
        showHome();
        return;
    }
    const json = await response.json();

    if (userData == null || userData.id != json._ownerId) {
        alert('Unauthorized!');
        showHome();
        return;
    }
    form.setAttribute('data-id', id);
    form.querySelector('#title').value = json.title;
    form.querySelector('textarea').value = json.description;
    form.querySelector('#imageUrl').value = json.img;
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    updateMovie({ title, description, img }, event.target.dataset.id)
}

async function updateMovie(movie, id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData == null) {
        alert('Unathorized! Please login first!');
        showLogin();
        return;
    }
    const url = 'http://localhost:3030/data/movies/' + id;
    try {
        console.log('test')
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'X-Authorization': userData.token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        if (res.ok != true){
            const err = await res.json();
            throw new Error(err.message);
        }
        showDetails(id);
    } catch (err) {
        alert(err.message);
        return;
    }
}




