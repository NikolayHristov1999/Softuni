import {html, render} from './node_modules/lit-html/lit-html.js'

let students = {};
const tbody = document.querySelector('tbody');
document.querySelector('#searchBtn').addEventListener('click', onSearch);

const tableTemplate = (students) => html`
${students.map(student => html`
<tr class=${student.active ? 'select' : ''}>
   <td>
      ${student.firstName + " " + student.lastName}
   </td>
   <td>
      ${student.email}
   </td>
   <td>
      ${student.course}
   </td>
</tr>`)}`;

async function update(){
   render(tableTemplate(Object.values(students)), tbody);
}

function onSearch(event){
   const input = document.getElementById('searchField').value.trim().toLocaleLowerCase();
   for (let student of students){
      const fullName = (student.firstName + " " + student.lastName);
      if (fullName.toLocaleLowerCase().includes(input) || 
      student.email.toLocaleLowerCase().includes(input) || 
      student.course.toLocaleLowerCase().includes(input)){
         student.active = true;
      } else{
         student.active = false;
      }
   }
   update();
}
start()
async function start(){
   const json = await (await fetch('http://localhost:3030/jsonstore/advanced/table')).json();
   students = Object.values(json);
   update();
}