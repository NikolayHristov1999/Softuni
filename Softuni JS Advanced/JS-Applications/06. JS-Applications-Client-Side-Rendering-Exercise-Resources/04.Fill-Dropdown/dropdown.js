import { html, render } from './node_modules/lit-html/lit-html.js'

async function addItem(event) {
    event.preventDefault();
    const text = document.getElementById('itemText').value;
    await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method:'post',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({text})
    });
    form.reset();
    update();
}

const menu = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', addItem);


const menuTemplate = (towns) => html`
${towns.map(town => html`
<option value=${town._id}>
    ${town.text}
</option>`)}`;

update();

async function update() {
    const towns = await (await fetch('http://localhost:3030/jsonstore/advanced/dropdown')).json();
    render(menuTemplate(Object.values(towns)), menu);
}