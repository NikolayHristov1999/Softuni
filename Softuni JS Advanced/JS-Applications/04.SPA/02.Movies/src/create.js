
import { showView } from "./dom.js";
import { showHome } from "./home.js";

//detach section from DOM
const section = document.getElementById('add-movie');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onCreate);

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    if ([title, description, imageUrl].some(x => x == "")) {
        alert('All fields are required!');
        return;
    }

    await createMovie({ title, description, img });
}

async function createMovie(movie) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData == null) {
        alert('Unauthorized! Please login before creating!');
    }
    const url = 'http://localhost:3030/data/movies';
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(movie)
    });

    if (res.ok != true) {
        alert('Something went wrong! Please try again!');
        return;
    }
    form.reset();
    showHome();
}


//display logic
export function showCreate() {
    showView(section);
}

