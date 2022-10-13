import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import {userContext} from "../Global_Pages/UserContext";
import {Link} from 'react-router-dom';
import './Maincontent.css'

const Main = () => {

    
    // Main content component is displayed in the landing page
    // giving information on the website and a sign-up button
    // which is conditionally rendered, depending if a user is
    // already signed in.

    const {user} = useContext(userContext);


    return (

        <div className="main-content">

             <h1>oo</h1>

            <div className = "webinfo-container">

                <div className="website-information"> 
                    <div className = "text-small">Hi Team, welcome to LAN (Loop Agile Now). 
                    We have made this social platform to improve and centralise our communications. 
                    We decided to make our own platform to ease flow of communications, keep things documentated 
                    and to prevent ethical issues that may have arised by using an external platform.</div>
                </div>


                <div className="placeholder">
                    <img src = "/images/Landing_Page/placeholder.jpg" alt=""></img>
                </div>
                
            </div>
        
                <div className = "text-info" id='damn'>What makes LAN better, for us and you?</div>

                        <div className = "boxes-container">

                        <div className = "boxes-info">

                            <img src= "/images/Landing_Page/better_com.jpg" className="logo" alt =""></img>
                            <div className = "text">Improved Communication</div>

                        </div>

                        <div className = "boxes-info">

                            <img src = "/images/Landing_Page/better_doc.jpg" className="logo" alt = ""></img>
                            <div className = "text">Improved Documentation</div>

                        </div>

                        <div className = "boxes-info">

                            <img src = "/images/Landing_Page/privacy.jpg" alt = ""></img>
                            <div className = "text">Improved User/Org Privacy</div>

                        </div>

                        <div className = "boxes-info">

                            <img src = "/images/Landing_Page/better_collab.jpg" alt = ""></img>
                            <div className = "text">Improved Collaboration</div>

                        </div>
                </div>

            <div className = 'qoute-info'>

            <div className = "qoute">Like a human being, a company has to have an internal communication mechanism... to coordinate its actions</div>
            <div className = "qoute-author">-Bill Gates, Founder of Microsoft</div>

            </div>

            <div className = "call-to-action">

            <div className = "content"> 
                <p id = 'bolde'><b>It's time to join up!</b></p>
                <p> Sign up to the company's new platform product by clicking that button right over there!</p>
            </div>

            <div className = "sign-up-button">

                {user ? (
                   <button id = "sign-up">You are already Logged In !</button>

                ) :

                   <Link to={'/SignUp'}><button id = "sign-up">Sign Up</button></Link>


                }

            </div>

            </div>


    </div>


    )
}

export default Main;
