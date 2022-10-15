import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar(){

    return (

        <div className = "navbar-container">
  
        <div className = "nav-logo">
            <Link to = "/"><img src = "/images/Header/header_logo.png" alt=""></img></Link>
        </div>

        <div className='admin-dashboard'>
            <h3>Admin DashBoard</h3>
        </div>
          
        <ul className = "nav-links">
            <Link to = "/Signup" className="links"><li>Post Admin Tasks </li></Link>
            <Link to = "/Login" className="links"><li>Post Analytics</li></Link> 
        </ul>
        
  
        </div>
      
       );
}

export default Navbar