async function lockedProfile() {
    const mainContainer = document.getElementById('main');
    const data = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    if (data.status != 200){
        return
    }
    const json = await data.json();
    let profiles = 1;
    for (let key in json){
        const profile = json[key];
        const profileElement = createProfileElement(profile.username, profile.email, profile.age, profiles);
        mainContainer.appendChild(profileElement);
        profiles++;
    }

}

function createProfileElement(username, email, age, profileNumber) {
    const profileDiv = document.createElement('div');
    profileDiv.className = 'profile'
    profileDiv.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="user${profileNumber}Locked" value="lock" checked>
<label>Unlock</label>
<input type="radio" name="user${profileNumber}Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user${profileNumber}Username" value="${username}" disabled readonly />
<div class="hiddenInfo">
    <hr>
    <label>Email:</label>
    <input type="email" name="user${profileNumber}Email" value="${email}" disabled readonly />
    <label>Age:</label>
    <input type="email" name="user${profileNumber}Age" value="${age}" disabled readonly />
</div>
<button>Show more</button>`

    profileDiv.querySelector('button').addEventListener('click',toggleInfo);
    return profileDiv;
}


function toggleInfo(e){
    const profile = e.target.parentElement;
    if (profile.querySelector('input').checked){
        return;
    }
    if (e.target.textContent == 'Show more'){
        profile.querySelector('div').classList.remove('hiddenInfo');
        e.target.textContent = 'Hide it'
    }
    else{
        e.target.textContent = 'Show more';
        profile.querySelector('div').className = 'hiddenInfo';
    }
}