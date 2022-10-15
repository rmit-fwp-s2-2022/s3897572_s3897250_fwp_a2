import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'




function DashBoard(){

    console.log("we in here")

    return (

      <div className='card-container'>          
        
        <div class="card">
          <img className='bar-graph-img' src="/images/Dashboard_home/networking.png" alt="Avatar"></img>
          <div class="container">
            <p>Currently a total of : # Need to get the number of users signed up in here</p> 
          </div>
        </div>

      
        <div class="card">
          <img className='bar-graph-img' src="/images/Dashboard_home/man.png" alt="Avatar"></img>
          <div class="container"> 
            <p>x number of people have used the service today.</p> 
          </div>
        </div>


      </div>
      
       );
  
  }


export default DashBoard