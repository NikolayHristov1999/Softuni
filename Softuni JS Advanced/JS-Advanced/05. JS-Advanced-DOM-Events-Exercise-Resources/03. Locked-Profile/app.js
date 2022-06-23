function lockedProfile() {
    const buttons = document.getElementsByTagName("button");
    for (let button of buttons){
        button.addEventListener('click', show);
    }

    function show(e){
        const profile = e.target.parentElement;
        console.log(profile);
        if (profile.querySelector("input[value=lock]").checked == false){
            if (e.target.textContent == "Show more"){
                profile.querySelector("div").style.display = "block";
                e.target.textContent = "Hide it";
            } else {
                profile.querySelector("div").style.display = "none";
                e.target.textContent = "Show more";
            }
        }
    }
}