import { cats as catData } from './catSeeder.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js';

catData.forEach(c => c.display = false);


const catsTemplate = (cats) => html`
<ul>
    ${cats.map(cat => catCard(cat))}
</ul>`;


const catCard = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${() => toggleInfo(cat)}>Show status code</button>
        <div class="status" style=${styleMap({display: cat.display ? 'block' : 'none'})} id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;

const root = document.getElementById('allCats');
update();
//root.addEventListener('click', onClick);


// function onClick(event) {
//     const target = event.target;
//     if (target.tagName == 'BUTTON') {
//         if (target.textContent == 'Show status code') {
//             target.parentElement.querySelector('.status').style.display = 'block';
//             target.textContent = 'Hide status code';
//         } else {
//             target.parentElement.querySelector('.status').style.display = 'none';
//             target.textContent = 'Show status code';
//         }
//     }
// }

function toggleInfo(cat){
    cat.display = !cat.display;
    update();
}

function update(){
    render(catsTemplate(catData), root);
}