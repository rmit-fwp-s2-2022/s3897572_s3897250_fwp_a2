import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyUser } from "../../data/repository";
import {userContext} from "../Global_Pages/UserContext"
import './Login.css'


/* MARKER INSTRUCTIONS / CODE REFERENCES:

1) 
    So this contains To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    Sourced regex expression from: https://www.w3resource.com/javascript/form/password-validation.php

2) 
    In order to validate our emails we have used the following regex expression and have got it from the following website:

    regex-expression: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    regex-email sourced from: https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B).

3) 
    In order to validate our first name and last name to only contain letters we have used the following regex expression and got it from the following web:
    
    regex-expression: /^[a-zA-Z]+$/
    regex-letter only expression sourced from: https://stackoverflow.com/questions/3073176/javascript-regex-only-english-letters-allowed
    
4)
    The handleSubmit and validation code have been used from the lab 8, provided by shekhar 


*/


export default function Login() { // props was passed here for unit testing
  const navigate = useNavigate();
  const {user, setUser} = useContext(userContext)

  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user_obj = await verifyUser(fields.username, fields.password);

    if(user_obj === null) {
      // Login failed, reset password field to blank and set error message.
      setFields({ ...fields, password: "" });
      setErrorMessage("Username and / or password invalid, please try again.");
      return;
    }
    
    if (user_obj.blocked === true) {
      setFields({ ...fields, password: "" });
      setErrorMessage("Your account has been blocked")
      return
    }

   /* if (props.handleSubmit){
        props.handleSubmit(event)
        navigate("/")
        return;
        } */

    // Set user state.
    setUser(user_obj);

    localStorage.setItem("user", JSON.stringify(user_obj));


    // Navigate to the home page.
    navigate("/");
  };



  return (
    <div className="row">

    <div className="column">
    
    <div className="login-text">

    <div className="form-title-login">    
      <h1 className = "login-Title">Welcome Back!</h1>
    </div>
    
    <h4> Don't have an account with LAN? <Link to = '/Signup'>Sign up here</Link></h4>

    <div className="login-form">
      
      <form onSubmit={handleSubmit}>

      <div className="login-box">
        <label htmlFor="username" className="control-label">Username</label>
                <input name="username" id="username" className="form-control"
                  value={fields.username} onChange={handleInputChange} />
      </div>

      <div className="login-box">
        <label htmlFor="password" className="control-label">Password</label>
                <input type="password" name="password" id="password" className="form-control"
                  value={fields.password} onChange={handleInputChange} />
      </div>

      <div className="submit-button-container-login">
        <button type="submit" className="submit-button" value="Register">Login</button>
      </div>

      {errorMessage !== null &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
      
      </form>

    </div>

    </div>

    </div>

    <div className="column">


      <div className="img-placement-login">

        <div className="image-itself-login">

        <p className="passion-text-login"> A passion for our staff... led us here</p>
          <img src = "/images/Signup_Page/sign-up-img.jpg" className="signup-img-login" alt=""></img>
        
        </div>

      </div>

    </div>

  
    </div>

    );
  }