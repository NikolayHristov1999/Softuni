const userData = JSON.parse(sessionStorage.getItem('userData'));
window.addEventListener('DOMContentLoaded', () => {
    loadData();
    if (userData != null) {
        document.querySelector('nav .email span').textContent = userData.email;
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
        document.getElementById('addForm').addEventListener('submit', onCreateSubmit);
        document.getElementById('logout').addEventListener('click', logout);
    } else {
        document.getElementById('user').style.display = 'none';
    }
    document.querySelector('.load').addEventListener('click', loadData);
});

async function onCreateSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const angler = formData.get('angler');
    const weight = formData.get('weight');
    const species = formData.get('species');
    const location = formData.get('location');
    const bait = formData.get('bait');
    const captureTime = formData.get('captureTime');

    const res = await create({ angler, weight, species, location, bait, captureTime });
    await loadData();
    return res;
}

async function loadData() {
    const data = await fetch('http://localhost:3030/data/catches');
    const json = await data.json();
    document.getElementById('catches').addEventListener('click', onClickCatches);

    document.getElementById('catches').replaceChildren(...json.map(createPreview))
}

async function onClickCatches(e) {
    if (e.target.textContent == 'Delete' && e.target.className == 'delete') {
        const res = await onDelete(e);
    } else if (e.target.textContent == 'Update' && e.target.className == 'update') {
        const res = await onUpdate(e);
    }
}

async function onDelete(event) {
    const id = event.target.dataset.id;
    const res = await deleteCatch(id);
    await loadData();
    return res;
}

async function onUpdate(event) {
    event.preventDefault();
    const parent = event.target.parentElement;
    const id = event.target.dataset.id;
    const angler = parent.querySelector('.angler').value;
    const weight = parent.querySelector('.weight').value;
    const species = parent.querySelector('.species').value;
    const location = parent.querySelector('.location').value;
    const bait = parent.querySelector('.bait').value;
    const captureTime = parent.querySelector('.captureTime').value;

    const res = await update({ angler, weight, species, location, bait, captureTime }, id);
    await loadData();
    return res;
}

function createPreview(item) {
    const isOwner = userData && item._ownerId == userData.id;
    const disabledStr = !isOwner ? 'disabled' : '';
    if (isOwner) {

    }
    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML = `<label>Angler</label>
    <input type="text" class="angler" value="${item.angler}" ${disabledStr}>
    <label>Weight</label>
    <input type="text" class="weight" value="${item.weight}" ${disabledStr}>
    <label>Species</label>
    <input type="text" class="species" value="${item.species}" ${disabledStr}>
    <label>Location</label>
    <input type="text" class="location" value="${item.location}" ${disabledStr}>
    <label>Bait</label>
    <input type="text" class="bait" value="${item.bait}" ${disabledStr}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${item.captureTime}" ${disabledStr}>
    <button class="update" data-id="${item._id}" ${disabledStr}>Update</button>
    <button class="delete" data-id="${item._id}" ${disabledStr}>Delete</button>`;
    return element;
}

async function create(data) {
    const url = 'http://localhost:3030/data/catches';
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': userData.token,
        },
        body: JSON.stringify(data)
    });

    return res;
}

async function update(data, id) {
    const url = 'http://localhost:3030/data/catches/' + id;
    const res = await fetch(url, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': userData.token,
        },
        body: JSON.stringify(data)
    });

    return res;
}

async function deleteCatch(id) {
    const url = 'http://localhost:3030/data/catches/' + id;
    const res = await fetch(url, {
        method: 'delete',
        headers: {
            'X-Authorization': userData.token,
        }
    });

    return res;
}

async function logout(e) {
    console.log('test')
    const url = 'http://localhost:3030/users/logout';
    const res = await fetch(url, {
        method: 'get',
        headers: {
            'X-Authorization': userData.token,
        }
    });
    if (res.ok == true) {
        sessionStorage.removeItem('userData');
        window.location = './index.html';
    }
}