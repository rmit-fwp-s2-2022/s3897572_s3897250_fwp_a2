import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import DashBoard from './components/Dashboard/Dashboard';
import Navbar from "./components/Navbar_footer/Navbar";


function App() {
  return (
    <BrowserRouter>

    <Navbar></Navbar>


    <Routes>

      <Route path = "/" element = {<DashBoard />}></Route>
    
    </Routes>

    </BrowserRouter>

  );
}

export default App;
