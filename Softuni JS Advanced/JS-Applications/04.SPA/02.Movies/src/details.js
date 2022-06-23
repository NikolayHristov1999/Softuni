
import { e, showView } from "./dom.js";
import { showEdit } from "./edit.js";
import { showHome } from "./home.js";

//detach section from DOM
const section = document.getElementById('movie-details');
section.remove();

//display logic
export function showDetails(movieId) {
    console.log(movieId);
    section.innerHTML = "<p>Loading...</p>"
    getMovie(movieId);
    showView(section);
}

async function getMovie(id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const requests = [
        fetch('http://localhost:3030/data/movies/' + id),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`),
    ];
    if (userData != null) {
        requests.push(fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`));
    }
    const [moviesRes, likesRes, isLikedRes] = await Promise.all(requests);
    const [movieData, likesData, isLiked] = await Promise.all([
        moviesRes.json(),
        likesRes.json(),
        isLikedRes && isLikedRes.json(),
    ]);

    section.replaceChildren(createMovieContainer(movieData, likesData, isLiked));
}

function createMovieContainer(movie, likes, likesInfo) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    let isLiked = likesInfo && likesInfo.length > 0;
    const div = e('div', { className: 'container' });
    div.innerHTML = `<div class="row bg-light text-dark">
    <div class="row col-md-12">
        <h1>Movie title: ${movie.title}</h1>
    </div>

    <div class="col-md-8">
        <img id="main-img-details" class="img-thumbnail" src="${movie.img}" alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${movie.description}</p>
        <div id="buttonsInteraction"></div>
    </div>
</div>`;
    updateButtons();

    return div;


    async function onLike(event) {
        event.preventDefault();
        await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'X-Authorization': userData.token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ movieId: movie._id })
        });
        showDetails(movie._id);
    }

    async function onUnlike(event) {
        event.preventDefault();
        await fetch('http://localhost:3030/data/likes/' + likesInfo[0]._id, {
            method: 'delete',
            headers: {
                'X-Authorization': userData.token,
            },
        });
        showDetails(movie._id);
    }

    async function onDelete(event) {
        event.preventDefault();
        if (userData == null) {
            alert('Unauthorized');
            return;
        }
        try {
            const res = await fetch('http://localhost:3030/data/movies/' + movie._id, {
                method: 'delete',
                headers: {
                    'X-Authorization': userData.token,
                }
            });

            if (res.ok != true) {
                const err = await res.json();
                throw new Error(err.message);
            }
            showHome();
        }
        catch(err){
            alert(err.message);
        }
    }

    function onEdit(event){
        event.preventDefault();
        showEdit(movie._id);
    }

    function updateButtons() {
        const divDescr = div.querySelector('#buttonsInteraction');
        divDescr.replaceChildren();

        if (userData != null) {
            if (movie._ownerId == userData.id) {
                const deleteBtn = e('a', { className: "btn btn-danger", href: "#" }, 'Delete');
                const editBtn = e('a', { className: "btn btn-warning", href: "#" }, 'Edit');

                deleteBtn.addEventListener('click', onDelete);
                editBtn.addEventListener('click', onEdit);

                divDescr.appendChild(deleteBtn);
                divDescr.appendChild(editBtn);
            } else {
                const likeButton = e('a', { className: 'btn btn-primary', href: "#" }, 'Like');
                if (isLiked) {
                    likeButton.textContent = 'Unlike';
                    likeButton.addEventListener('click', onUnlike);
                } else {
                    likeButton.addEventListener('click', onLike);
                }
                divDescr.appendChild(likeButton);
            }
        }
        divDescr.appendChild(e('span', { className: "enrolled-span" }, `Liked ${likes}`))
    }
}

