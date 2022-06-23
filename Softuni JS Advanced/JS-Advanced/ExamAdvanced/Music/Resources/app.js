window.addEventListener('load', solve);

function solve() {
    const imgLink = './static/img/img.png'
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', submit);
    const fields = Array.from(document.querySelectorAll("form input"));
    const allHits = document.getElementsByClassName('all-hits-container')[0];
    const likesP = document.querySelector('.likes p');
    const savedHits = document.getElementsByClassName('saved-container')[0];
    let totalLikes = 0;

    
    function submit(e){
        e.preventDefault();
        const [genre, songName, author, date] = fields.map(f => f.value.trim());

        if (fields.map(f => f.value.trim()).some( v => v == '')){
            return;
        }

        const div = document.createElement('div');
        div.className = ('hits-info');
        div.innerHTML = `<img src="${imgLink}" >
<h2>Genre: ${genre}</h2>
<h2>Name: ${songName}</h2>
<h2>Author: ${author}</h2>
<h3>Date: ${date}</h3>`;
        const saveBtn = document.createElement('button');
        const likeBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        saveBtn.className = "save-btn";
        saveBtn.textContent = 'Save song';
        saveBtn.addEventListener('click', saveSong);
        
        likeBtn.className = "like-btn";
        likeBtn.textContent = 'Like song';
        likeBtn.addEventListener('click', likeSong);

        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteSong);

        div.appendChild(saveBtn);
        div.appendChild(likeBtn);
        div.appendChild(deleteBtn);
        allHits.appendChild(div);

        console.log(genre,songName, author, date);

        fields.forEach(f => f.value = "");
    }

    function likeSong(e){
        e.target.disabled = true;
        totalLikes++;
        likesP.textContent = `Total Likes: ${totalLikes}`;
    }

    function saveSong(e){
        const div = e.target.parentElement;

        div.getElementsByClassName('save-btn')[0].remove();
        div.getElementsByClassName('like-btn')[0].remove();
        savedHits.appendChild(div);

    }

    function deleteSong(e){
        e.target.parentElement.remove();
    }
}