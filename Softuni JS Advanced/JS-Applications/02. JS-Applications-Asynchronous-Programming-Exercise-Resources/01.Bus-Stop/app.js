async function getInfo() {
    const input = document.getElementById('stopId').value;
    const name = document.getElementById('stopName');
    const uri = `http://localhost:3030/jsonstore/bus/businfo/${input}`;

    const data = await fetch(uri);
    if (data.status != 200){
        name.textContent = 'Error';
        return;
    }
    const json = await data.json();

    name.textContent = json.name;
    const ul = document.getElementById('buses');
    ul.replaceChildren();
    for (let key in json.buses){
        const li = document.createElement('li');
        li.textContent = `Bus ${key} arrives in ${json.buses[key]} minutes`
        ul.appendChild(li);
    }
}