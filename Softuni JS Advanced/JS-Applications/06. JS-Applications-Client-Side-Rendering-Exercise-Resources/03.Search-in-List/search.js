import {towns as townsData} from './towns.js';
import {html, render} from './node_modules/lit-html/lit-html.js'; 

const townsEl = document.getElementById('towns');
const result = document.getElementById('result');
const townsObj = townsData.map(x => { return {name: x, active: false}})

document.querySelector('button').addEventListener('click', onSearch);

function onSearch(event){
   const search = document.getElementById('searchText').value.trim().toLocaleLowerCase();
   let matches = 0;
   for (let town of townsObj){
      if (town.name.toLocaleLowerCase().includes(search)){
         town.active = true;
         matches++;
      } else{
         town.active = false;
      }
   }
   result.textContent = matches + " matches found";
   update();

}
const townsTemplate = (towns) => html`<ul>${towns.map(town => html`
<li class="${town.active ? 'active' : ''}">
   ${town.name}</li>`)}
</ul>`;

function update(){
   render(townsTemplate(townsObj), townsEl);
}

update();