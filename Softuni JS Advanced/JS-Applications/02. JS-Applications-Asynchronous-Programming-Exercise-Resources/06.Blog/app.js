function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadData);
    console.log('TODO...');
}


async function loadData() {
    const posts = document.getElementById('posts');
    posts.replaceChildren();
    const postsData = await fetch('http://localhost:3030/jsonstore/blog/posts');
    if (postsData.status != 200) {
        return;
    }
    const postsJson = await postsData.json();

    for (let key in postsJson) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = postsJson[key].title;
        posts.appendChild(option);
    }

    document.getElementById('btnViewPost').addEventListener('click', viewPost);
}

async function viewPost(e) {
    const value = document.getElementById('posts').value;
    console.log(value);
    const data = await fetch(`http://localhost:3030/jsonstore/blog/posts/${value}`);
    const json = await data.json();
    document.getElementById('post-title').textContent = json.title;
    document.getElementById('post-body').textContent = json.body;
    loadComments(value);
}

async function loadComments(id){
    const commentsUl = document.getElementById('post-comments');
    commentsUl.replaceChildren();
    const data = await fetch('http://localhost:3030/jsonstore/blog/comments');
    const json = await data.json();

    for (let key in json){
        if (json[key].postId == id){
            const li = document.createElement('li');
            li.setAttribute('id', key);
            li.textContent = json[key].text;
            commentsUl.appendChild(li);
        }
    }
}

attachEvents();