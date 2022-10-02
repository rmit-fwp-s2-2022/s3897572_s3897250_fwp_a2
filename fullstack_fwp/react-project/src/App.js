import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { userContext } from "./components/Global_Pages/UserContext";
import SignUp from "./components/Home_Page/Signup";
import LandingPage from "./components/Home_Page/LandingPage";
import { getUser, removeUser } from "./data/repository";


export default function App() {

  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };


  return (
    <BrowserRouter>
    
    <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/SignUp" element={<SignUp loginUser={loginUser} />}></Route>  
    </Routes>

    
    
    
    
    
    
    
    
    
    
    
    
    </BrowserRouter>
  );
}