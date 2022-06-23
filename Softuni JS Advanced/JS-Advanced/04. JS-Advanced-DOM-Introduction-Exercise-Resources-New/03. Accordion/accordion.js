function toggle() {
    const text = document.getElementById("extra");
    const button = document.getElementsByClassName("button");
    
    if (button[0].textContent == "More"){
        text.style.display = "block";
        button[0].textContent = "Less";
    } else {
        text.style.display = "none";
        button[0].textContent = "More";
    }
}