import { getById, deleteById } from "../api/data.js";
import { e } from "../dom.js";

const section = document.getElementById('detailsPage');
section.remove();
let context = null;

export async function showDetailsPage(ctx, id) {
    context = ctx;
    ctx.showSection(section);
    showIdea(id);
}

async function showIdea(id) {
    section.replaceChildren('Loading...');
    const idea = await getById(id);
    section.replaceChildren(createIdea(idea));
}

function createIdea(idea) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const fragment = document.createElement('template');
    fragment.innerHTML = ` 
    <img class="det-img" src="${idea.img}">
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>`;

    if (userData != null && userData.id == idea._ownerId) {
        fragment.innerHTML += `<div class="text-center">
            <a class="btn detb" href="">Delete</a>
        </div>`;
        fragment.content.querySelector('.detb').addEventListener('click', async (event) => {
            event.preventDefault();
            await deleteById(idea._id);
            context.goTo('catalog');
        })
    }
    return fragment.content;
}

/**
<div id="detailsPage" class="container home some">
    <img class="det-img" src="./images/dinner.jpg">
    <div class="desc">
        <h2 class="display-5">Dinner Recipe</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">There are few things as comforting as heaping bowl of pasta at the end of a
            long
            day. With so many easy pasta recipes out there, there's something for every palate to love. That's
            why
            pasta
            makes such a quick, easy dinner for your family—it's likely to satisfy everyone's cravings, due to
            its
            versatility.</p>
    </div>
    <div class="text-center">
        <a class="btn detb" href="">Delete</a>
    </div>
</div> */