import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyUser } from "../../data/repository";
import {userContext} from "../Global_Pages/UserContext"
import './Login.css'

export default function Login() {
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