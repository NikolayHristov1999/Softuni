function validate() {
    const regex = /^.+@.+\..+$/;
    const email = document.getElementById('email');
    email.addEventListener('change', checkEmail)

    function checkEmail(e){
        if (!regex.test(email.value)){
            email.classList.add("error");
        }
        else{
            email.classList.remove("error");
        }
    }
    // TODO
}