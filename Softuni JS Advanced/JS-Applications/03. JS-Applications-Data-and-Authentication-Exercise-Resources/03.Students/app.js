function attachEvents() {
    loadStudents();
    document.getElementById('form').addEventListener('submit', onSubmit);
}

const tbody = document.querySelector("#results tbody");

async function loadStudents() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const data = await fetch(url);
    const json = await data.json();

    for (key in json) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${json[key].firstName}</td>
        <td>${json[key].lastName}</td>
        <td>${json[key].facultyNumber}</td>
        <td>${json[key].grade.toFixed(2)}</td>`;
        tbody.appendChild(tr);
    }
}

async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const facultyNumber = data.get('facultyNumber');
    const grade = Number(data.get('grade'));

    const result = await createStudent({firstName, lastName, facultyNumber, grade});
    console.log(await result.json());

    const tr = document.createElement('tr');
        tr.innerHTML = `<td>${firstName}</td>
        <td>${lastName}</td>
        <td>${facultyNumber}</td>
        <td>${grade.toFixed(2)}</td>`;
        tbody.appendChild(tr);
}

async function createStudent(data){
    const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response;
}

attachEvents();