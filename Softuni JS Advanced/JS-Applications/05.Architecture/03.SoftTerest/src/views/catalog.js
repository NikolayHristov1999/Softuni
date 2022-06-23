import { getAllIdeas } from "../api/data.js";
import { e } from "../dom.js";

const section = document.getElementById('dashboard-holder');
section.remove();
section.addEventListener('click', onDetails);

let context = null;

export async function showCatalogPage(ctx) {
    context = ctx;
    ctx.showSection(section);
    loadIdeas();
}

async function loadIdeas() {
    section.replaceChildren('loading...')
    const ideas = await getAllIdeas();

    if (ideas.length == 0) {
        section.replaceChildren(e('h1', {}, 'No ideas yet! Be the first one :)'))
    }

    const fragment = document.createDocumentFragment();

    ideas.map(createIdeaCard).forEach(i => fragment.appendChild(i));

    section.replaceChildren(fragment);
}

function createIdeaCard(idea) {
    const div = e('div', {});
    div.className = "card overflow-hidden current-card details";
    div.style = "width: 20rem; height: 18rem";
    div.innerHTML = `
<div class="card-body">
    <p class="card-text">${idea.title}</p>
</div>
<img class="card-image" src="${idea.img}" alt="Card image cap">
<a data-id="${idea._id}" class="btn" href="">Details</a>`;
    return div;
}


function onDetails(event) {
    const target = event.target;
    if (target.tagName == 'A') {
        event.preventDefault();
        const id = target.dataset.id;
        context.goTo('details', id);
    }
}