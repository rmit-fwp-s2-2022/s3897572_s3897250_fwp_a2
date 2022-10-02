import { Link } from 'react-router-dom';
import './Header.css'
import { userContext } from '../components/Global_Pages/UserContext';
import { useContext } from 'react';

const Header = () => {

    // Shows links to different web pages depending on the login status
    // of the client viewing the website.

    const {user, setUser} = useContext(userContext)
    
     return (

      <div className = "navbar-container">

      <div className = "nav-logo">
          <Link to = "/"><img src = "/images/Header/header_logo.png" alt=""></img></Link>
      </div>
        
        {/* loggedInUser (string: email) dictates the conditional view */}
        
        
        {user ? ( 
      
            <ul className = "nav-links">
              <Link to = "/" className="links"><li onClick={() => setUser(null)}>Sign out</li></Link>
              <Link to = "/Profile" className="links"><li>Profile Management</li></Link>
              <Link to = "/create" className="links"><li>Create post</li></Link>
              <Link to = "/ProfilePosts" className="links"><li>My Posts</li></Link>
            </ul>
            
              
        ) :
            <ul className = "nav-links">
                <Link to = "/Signup" className="links"><li>Sign Up</li></Link>
                <Link to = "/Login" className="links"><li>Log In</li></Link> 
            </ul>
        }

      </div>
    
     );

}
  
  



export default Header
