async function attachEvents() {
    await refreshMessages();
    document.getElementById('submit').addEventListener('click', onSubmitMsg);
    document.getElementById('refresh').addEventListener('click', refreshMessages);
}

async function onSubmitMsg(e){
    const author = document.querySelector('[name="author"]').value;
    const content = document.querySelector('[name="content"]').value;

    const result = await sendMessage({author, content});
}

async function refreshMessages(){
    const uri = 'http://localhost:3030/jsonstore/messenger';
    const textArea = document.getElementById('messages');
    let messages = '';

    const data = await fetch(uri);
    if (data.ok != true){
        return;
    }

    const json = await data.json();
    for(let key in json){
        messages += `${json[key].author}: ${json[key].content}\n`;
    }
    textArea.value = messages;
}

async function sendMessage(message){
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(message)
    }

    const res = await fetch(url, options);
    const result = await res.json();

    return result;
}

attachEvents();