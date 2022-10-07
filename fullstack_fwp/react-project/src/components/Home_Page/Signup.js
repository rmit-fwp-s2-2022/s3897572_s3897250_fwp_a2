/* eslint-disable no-useless-escape */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {userContext} from "../Global_Pages/UserContext"
import {findUser, createUser} from "../../data/repository";
import './Signup.css'

function SignUp() {

  const navigate = useNavigate();

  const {user, setUser} = useContext(userContext)

  const [fields, setFields] = useState({
    username: "", firstname: "", lastname: "",  password: "", user_id: parseInt(Date.now())
  });
  const [errors, setErrors] = useState({ });

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event ) =>{

    event.preventDefault();

    const {isValid} = await handleValidation();

    console.log(fields)

    if(!isValid)
      return;

    // Create user.

    const user_obj = await createUser(fields);
    
    // Set user state.

    setUser(user_obj)

    // Navigate to the home page.
    navigate("/Profile");

  }


  const handleValidation = async () => {

    const currentErrors = { } // A key-pair object that is used to handle errors/ gather errors.

    
    let key = "username";
    let field = fields[key];
    if(field.length === 0)
      currentErrors[key] = "Username is required.";
    else if(field.length > 32)
      currentErrors[key] = "Username length cannot be greater than 32.";
    else if(await findUser(fields.username) !== null)
      currentErrors[key] = "Username is already registered.";
    
    else if (field.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) == null)
      currentErrors[key] = "Email formatting is not correct."

    key = "firstname";
    field = fields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";
    
    else if (field.match(/^[a-zA-Z]+$/) == null)
      currentErrors[key] = "First Name cannot contain symbols or numbers";

    key = "lastname";
    field = fields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";
    else if (field.match(/^[a-zA-Z]+$/) == null)
      currentErrors[key] = "Last Name cannot contain symbols or numbers";

    key = "password";
    field = fields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(field.length < 6)
      currentErrors[key] = "Password must contain at least 6 characters.";
    else if(field.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/) ==  null){
      currentErrors[key] = "Passwords should contain 8 to 15 characters, one uppercase letter, one numeric digit and one special character"
    }

    setErrors(currentErrors);

    return {isValid: Object.keys(currentErrors).length === 0 };
  };
  


  return (

    <div className="row">

    <div className="column">
    
    <div className="signup-text">

    <div className="form-title">    
      <h1 className = "signup-Title">Sign-Up Form</h1>
    </div>

    <h4> Already have an account with LAN? <Link to = '/Login'>Log in here</Link></h4>


    <div className="signup-form">
      
      <form onSubmit={handleSubmit}>

      <div className="signup-box">
        <label htmlFor="username" className="control-label">Username</label>
                <input name="username" id="username" className="form-control"
                  value={fields.username} onChange={handleInputChange} />
                {errors.username &&
                  <div className="text-danger">{errors.username}</div>
                }
      </div>

      <div className="signup-box">
        <label htmlFor="firstname" className="control-label">First name</label>
                <input name="firstname" id="firstname" className="form-control"
                  value={fields.firstname} onChange={handleInputChange} />
                {errors.firstname &&
                  <div className="text-danger">{errors.firstname}</div>
                }
      </div>

      <div className="signup-box">
        <label htmlFor="lastname" className="control-label">Last name</label>
                <input name="lastname" id="firstname" className="form-control"
                  value={fields.lastname} onChange={handleInputChange} />
                {errors.lastname &&
                  <div className="text-danger">{errors.lastname}</div>
                }
      
      </div>

      <div className="signup-box">

        <label htmlFor="password" className="control-label">
                  Password <small className="text-muted">must be at least 6 characters</small>
                </label>
                <input type="password" name="password" id="password" className="form-control"
                  value={fields.password} onChange={handleInputChange} />
                {errors.password &&
                  <div className="text-danger">{errors.password}</div>
                }
      </div>

      <div className="submit-button-container">
        <button type="submit" className="submit-button" value="Register">Sign up</button>
      </div>

      </form>

      </div>

      </div>

      </div>
      
    <div className="column">


      <div className="img-placement">

        <div className="image-itself">

        <p className="passion-text"> A passion for our staff... led us here</p>
          <img src = "/images/Signup_Page/sign-up-img.jpg" className="signup-img" alt=""></img>
        
        </div>

      </div>

    </div>

  
    </div>
      


  )


}

export default SignUp;

