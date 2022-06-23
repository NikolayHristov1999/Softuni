import { e, showView } from "./dom.js";
import { showPost } from "./post.js";

const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const section = document.getElementById('homeview');
const posts = section.querySelector(".topic-title");
const form = section.querySelector('form');
form.querySelector('.cancel').addEventListener('click', onCancel);
form.addEventListener('submit', onSubmit);
posts.addEventListener('click', onClick);
section.remove();

export function showHome(){
    getPosts();
    showView(section);
}

function onClick(event){
    event.preventDefault();
    let target = event.target;
    if (target.tagName == "H2"){
        target = target.parentElement;
    }
    if (target.tagName == "A"){
        const id = target.dataset.id;
        showPost(id);
    }
}


async function getPosts(){
    try{
        const res = await fetch(url);
        if (res.ok != true){
            const err = await res.json();
            throw new Error(err.message);
        }
        const json = await res.json();
        const keys = Object.keys(json);
        const allPosts = [];
        keys.forEach((x) => allPosts.push(createPostDiv(json[x])))
        posts.replaceChildren(...allPosts);
    } catch(err){
        alert(err.message);
    }
}

function createPostDiv(post){
    const div = e('div',{className: 'topic-name-wrapper'});
    div.innerHTML = `  <div class="topic-name">
    <a href="#" data-id="${post._id}" class="normal">
        <h2>${post.title}</h2>
    </a>
    <div class="columns">
        <div>
            <p>Date: <time>${post.dateTime}</time></p>
            <div class="nick-name">
                <p>Username: <span>${post.username}</span></p>
            </div>
        </div>
    </div>
</div>`;
    return div;
}

function onCancel(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    form.querySelector('#topicName').value = "";
    form.querySelector('#username').value = "";
    form.querySelector('#postText').value = "";
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('topicName');
    const username = formData.get('username');
    const text = formData.get('postText');
    const dateTime = new Date().toISOString();

    if([title, username, text].some(x => x == "")){
        alert('All fields required');
        return;
    }
    try{
        const res = await fetch(url, {
            method:'post',
            headers:{
                'content-type': 'application/json',
            },
            body: JSON.stringify({title, username, text, dateTime})
        });

        if(res.ok != true){
            const err = await res.json();
            throw new Error(err.message);
        }
        showHome();
    } catch(err){
        alert(err.message);
        return;
    }
}