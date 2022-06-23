import { e, showView } from "./dom.js";

const section = document.getElementById('postView');
section.remove();

export function showPost(postId) {
    getPost(postId);
    showView(section);
}

async function getPost(id) {
    const requests = [
        fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + id),
        fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`),
    ];
    const [postRes, commentsRes] = await Promise.all(requests);
    const [postData, commentsData] = await Promise.all([
        postRes.json(),
        commentsRes.json(),
    ]);
    const comments = []
    for (let key in commentsData){
        if (commentsData[key].postId == id){
            comments.push(commentsData[key]);
        }
    }
    section.replaceChildren(createDetailedPostDiv(postData, comments));
}

function createDetailedPostDiv(post, comments) {
    const div = e('div', { className: 'comment' });
    const commentsDiv = e('div', { id: "user-comment" });
    div.innerHTML = `<div class="header">
    <img src="./static/profile.png" alt="avatar">
    <p><span>${post.username}</span> posted on <time>${post.dateTime}</time></p>
    <p class="post-content">${post.text}</p>
</div>`;



    const createCommentDiv = e('div', { className: 'answer-comment' });
    for (const comment of comments) {
        commentsDiv.innerHTML += `<div id="user-comment">
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <p><strong>${comment.username}</strong> commented on <time>${comment.dateTime}</time></p>
                    <div class="post-content">
                        <p>${comment.text}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }
    createCommentDiv.innerHTML = `
    <div class="answer-comment">
        <p><span>currentUser</span> comment:</p>
        <div class="answer">
            <form data-id="${post._id}">
                <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                <div>
                    <label for="username">Username <span class="red">*</span></label>
                    <input type="text" name="username" id="username">
                </div>
                <button>Post</button>
            </form>
        </div>
    </div>`;
    createCommentDiv.querySelector('form').addEventListener('submit', onCommentSubmit);

    div.appendChild(commentsDiv);
    div.appendChild(createCommentDiv);
    return div;
}

async function onCommentSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get('postText');
    const username = formData.get('username');
    const dateTime = new Date().toISOString();
    const postId = event.target.dataset.id;

    if ([username, text].some(x => x == "")) {
        alert('All fields required');
        return;
    }
    try {
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ username, text, dateTime, postId })
        });

        if (res.ok != true) {
            const err = await res.json();
            throw new Error(err.message);
        }
        showPost(postId);
    } catch (err) {
        alert(err.message);
        return;
    }


}

/*<div class="comment">
            <div class="header">
                <img src="./static/profile.png" alt="avatar">
                <p><span>David</span> posted on <time>2020-10-10 12:08:28</time></p>

                <p class="post-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure facere sint
                    dolorem quam,
                    accusantium ipsa veniam laudantium inventore aut, tenetur quibusdam doloribus. Incidunt odio
                    nostrum facilis ipsum dolorem deserunt illum?</p>
            </div>


            <div id="user-comment">
                <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <p><strong>Daniel</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
                        <div class="post-content">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure facere sint
                                dolorem quam.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>*/