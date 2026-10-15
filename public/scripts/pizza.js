document.getElementById("pizza-form").onsubmit = () => {

    // reset error messages and validation
    clearErrorMessages();
    var isValid = true;

    let fname = document.getElementById("fname").value.trim();
    if (fname === "") {                                                 // fname validation
        document.getElementById("err-fname").style.display = "block";   // display error message
        isValid = false;                                                // mark entire form as invalid until next submit
    }
    let lname = document.getElementById("lname").value.trim();
    if (lname === "") {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }
    let email = document.getElementById("email").value.trim();
    /*if (email === "") {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    } */
    
    // submit only if data was valid
    return isValid;
};

function clearErrorMessages() {
    let errors = document.getElementsByClassName("error");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}