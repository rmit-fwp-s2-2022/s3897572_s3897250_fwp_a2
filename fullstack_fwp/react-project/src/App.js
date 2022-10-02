import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { userContext } from "./components/Global_Pages/UserContext";
import SignUp from "./components/Home_Page/Signup";
import LandingPage from "./components/Home_Page/LandingPage";
import ProfileManagement from "./components/ProfileManagement/profile_managment";
import { setUser, getUser, removeUser } from "./data/repository";
import Profile from "./components/Profile_Page/Profile";


export default function App() {

  const [user, setLoggedInUser] = useState(getUser());

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
          <Route path="/ProfileManagement" element={<ProfileManagement onLogin={loginUser} loggedInUser={user}/>}></Route>
          <Route path="/Profile" element={<Profile onLogout={logoutUser} loggedInUser={user}/>}></Route> 

    </Routes>

    </BrowserRouter>
  );
}