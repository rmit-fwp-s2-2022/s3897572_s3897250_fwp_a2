import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { userContext } from "./components/Global_Pages/UserContext";
import SignUp from "./components/Home_Page/Signup";
import LandingPage from "./components/Home_Page/LandingPage";

export default function App() {

  const [user, setUser] = useState(null); // User has not been registered, so set to null. 

  

  return (
    <BrowserRouter>
    
    <userContext.Provider value={{user, setUser}}>
    <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>  
    </Routes>
    </userContext.Provider>

    
    
    
    
    
    
    
    
    
    
    
    
    </BrowserRouter>
  );
}