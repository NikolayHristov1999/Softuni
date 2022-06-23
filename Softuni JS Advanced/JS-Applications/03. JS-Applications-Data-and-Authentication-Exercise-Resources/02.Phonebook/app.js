function attachEvents(){
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onCreate);
    loadContacts();
}

async function loadContacts(){
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const data = await fetch(url);
    if (data.ok == false){
        return;
    }
    const json = await data.json();
    const phonebook = document.getElementById('phonebook');
    phonebook.replaceChildren();
    for (let key in json){
        const li = document.createElement('li');
        const btn = document.createElement('button');

        
        btn.setAttribute('data-id', key);
        btn.textContent = 'Delete';
        btn.addEventListener('click', onDelete);

        li.textContent = `${json[key].person}: ${json[key].phone}`;
        li.appendChild(btn);
        
        phonebook.appendChild(li);
        
    }

}

async function onDelete(e){
    const id = e.target.getAttribute('data-id');
    await deleteContact(id);
    loadContacts();
}

async function onCreate(){
    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;
    
    const res = await createContact({person, phone});
    loadContacts();
}

async function deleteContact(id){
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;
    const res = await fetch(url, {
        method: 'delete'
    });
}

async function createContact(contact){
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(contact)
    });

    const result = await res.json();
    return result;
}


attachEvents();