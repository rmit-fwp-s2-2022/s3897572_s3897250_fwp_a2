
// Validation rules for each input box of the sign-up form, using regex and checking localstorage.

/*eslint-disable no-useless-escape */

function emailError(state, email) {
    if ((state === false) && ((email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null)) && (email.length > 0)){
        return (
            <div className='AlertMessage'>Error: Make sure email formatting is correct! </div>
        )
    } else if ((state === false) && (email.length === 0)){
        return(
            <div className="AlertMessage">Error: Email not provided</div>
        )
    }

    }


function nameError(state, nameType){
    if ((state === false) && ((nameType.match(/^[a-zA-Z]+$/) === null)) && (nameType.length > 0)){
        return (
            <div className='AlertMessage'>Error: Remove numbers or symbols or spaces from name</div>
        )

    } 
    

    else if ((state === false) && (nameType.length === 0)){
            return(
                    <div className="AlertMessage">Error: Name not provided</div>
                )
            }
        
}

function passwordError(state, password){
    if ((state === false) && ((password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/) === null)) && (password.length > 0)){
        return (
            <div className='AlertMessage'>Error: Passwords should contain 8 to 15 characters, one uppercase letter, one numeric digit and one special character. </div>
        )

    }

    else if ((state === false) && (password.length === 0)){
        return(
            <div className="AlertMessage"> Error: Password not entered</div>

        )
    }
    
}

    // Checks localstorage for valid email (corresponding to a user)
function emailCheck(email) {

    let email_detected = false
    
    for(let i = 0; i < localStorage.length; i++){
        let key_local_storage = localStorage.key(i);

        if (key_local_storage === email){
            email_detected = true;
        }

    }

    if (email_detected === true){
        return(
            <div className='AlertMessage'>This email already exists within system!</div>
        )

    }

    return email_detected;

}


function emailCheck_ProfileChange(original_email, updatedEmail){

    if (original_email !== updatedEmail){
        emailCheck(updatedEmail)
    }

}



function date_generate() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    const currDate = new Date().getDate().toString();
    const currYear = new Date().getFullYear().toString();
    const currMonth = monthNames[new Date().getMonth()];
    const currDay = new Date().toLocaleString('en-US', {weekday: 'long'});

    const finalDate = 'Joined: ' + currDay + " " + currDate + " " + currMonth + " " + currYear;

    return finalDate;

}


function error_Login(state) {
    if ((state === false)){
        return (
            <div className='AlertMessage'>Error: Incorrect Email or Password</div>
        )
    } 
    } 


export {emailError, nameError, passwordError, emailCheck, emailCheck_ProfileChange, date_generate, error_Login}
