document.getElementById("pizza-form").onsubmit = () => {

    // reset error messages and validation
    clearErrorMessages();
    var isValid = true;

    let fname = document.getElementById("fname").value.trim();
    if (fname === "") {                                                 // fname validation
        document.getElementById("err-fname").style.display = "block";   // if fail: display error message
        isValid = false;                                                // mark entire form as invalid until next submit
    }
    let lname = document.getElementById("lname").value.trim();
    if (lname === "") {                                                 // lname validation
        document.getElementById("err-lname").style.display = "block";   // if fail: display error message
        isValid = false;                                                // mark entire form as invalid until next submit
    }
    let email = document.getElementById("email").value.trim();          // email validation
    if (email === "") {                                                 // if fail: display error message
        document.getElementById("err-email").style.display = "block";   // mark entire form as invalid until next submit
        isValid = false;
    }
    let methodSelected = false;                                         // pickup / delivery validation
    let methodButtons = document.getElementsByName("method");           // fetch status of options
    for (let i = 0; i < methodButtons.length; i++) {                    // loop through options
        if (methodButtons[i].checked)                                   // if an option is selected
            methodSelected = true;                                      // confirm validity
    }
    if (!methodSelected) {                                              
        document.getElementById("err-method").style.display = "block";  // if fail: display error message
        isValid = false;                                                // mark entire form as invalid until next submit
    }
    let size = document.getElementById("size").value;
    if (size == "none") {                                               // check if a valid option was selected
        document.getElementById("err-size").style.display = "block";    // if fail: display error message
        isValid = false;                                                // mark entire form as invalid until next submit
    }
    
    return isValid;                                                     // submit only if data was valid
};

function clearErrorMessages() {
    let errors = document.getElementsByClassName("error");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}