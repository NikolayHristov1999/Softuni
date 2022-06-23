function validate() {
    document.getElementById('submit').addEventListener('click', check);
    const company = document.getElementById('company');
    const companyInfo = document.getElementById('companyInfo');
    company.addEventListener('click', toggleCompany);
    const divValid = document.getElementById('valid');

    function check(e) {
        e.preventDefault();
        let flag = true;

        const username = document.getElementById('username');
        const userRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (!regexCheck(userRegex, username)) {
            flag = false;
        }

        const email = document.getElementById('email');
        const emailRegex = /.*@.*\.+.*/;
        if (!regexCheck(emailRegex, email)) {
            flag = false;
        }

        const password = document.getElementById('password');
        const passwordReg = /^\w{5,15}$/;
        if (!regexCheck(passwordReg, password)) {
            flag = false;
        }

        const confirmPassoword = document.getElementById('confirm-password');
        if (confirmPassoword.value != password.value) {
            flag = false;
            changeBorderColor(confirmPassoword, 'red');
            changeBorderColor(password, 'red');
        } else {
            if (!regexCheck(passwordReg, confirmPassoword)) {
                flag = false;
            }
        }

        if (company.checked) {
            const companyNumber = document.getElementById('companyNumber');
            const regexNumber = /^[1-9][0-9]{3}$/;
            if (!regexCheck(regexNumber, companyNumber)) {
                flag = false;
            }
        }



        if (flag) {
            divValid.style.display = 'block';
        } else {
            divValid.style.display = 'none';
        }



    }
    function regexCheck(pattern, element) {
        if (!pattern.test(element.value)) {
            changeBorderColor(element, 'red');
            return false;
        } else {
            changeBorderColor(element, '');
            return true;
        }
    }
    function changeBorderColor(element, color) {
        element.style.borderColor = color;
    }

    function toggleCompany(e) {
        if (company.checked) {
            companyInfo.style.display = "block";
        }
        else {
            companyInfo.style.display = "none";
        }
    }
    // TODO
}
// •	The username needs to be between 3 and 20 symbols inclusively and only letters and numbers are allowed.
// •	The password and confirm-password must be between 5 and 15 inclusively symbols and only word characters are allowed (letters, numbers and _).
// •	The inputs of the password and confirm-password field must match.
// •	The email field must contain the “@” symbol and at least one "."(dot) after it.

// If the "Is company?" checkbox is checked, the CompanyInfo fieldset should become visible and the Company Number field must also be validated, if it isn’t checked the Company fieldset should have the style "display: none;" and the value of the Company Number field shouldn’t matter. 
// •	The Company Number field must be a number between 1000 and 9999.
// •	Use addEventListener() function to attach an event listener for the "change" event to the checkbox.

