import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { userContext } from "./components/Global_Pages/UserContext";
import { postContext } from "./components/Global_Pages/PostContext";
import SignUp from "./components/Home_Page/Signup";
import LandingPage from "./components/Home_Page/LandingPage";
import ProfileManagement from "./components/ProfileManagement/profile_managment";
import {getUser, removeUser, findUser } from "./data/repository";
import Profile from "./components/Profile_Page/Profile";
import Login from "./components/Home_Page/Login";
import Header from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import CreatePost from "./components/Posts/CreatePost"
import ProfilePosts from "./components/Posts/ProfilePosts"
import PostView from "./components/Posts/PostView";
import Users from "./components/Posts/Users"


export default function App() {

  const [user, setUser] = useState(getUser()); // User has not been registered, so set to null. 

  return (
    <BrowserRouter>
    
    <userContext.Provider value={{user, setUser}}>


      <Header></Header>

      <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/SignUp" element={<SignUp/>}></Route> 
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/Profile" element={<Profile/>}></Route> 
            <Route path="/ProfileManagement" element={<ProfileManagement/>}></Route>
            <Route path="/Users" element={<Users/>}></Route>

                <Route path="/ProfilePosts"> 
                  <Route path=":id" element={<ProfilePosts/>}/>
                </Route>
              
              <Route path="/PostView" >
                <Route path=":id" element={<PostView/>}></Route>
              </Route>

            <Route path="/create" element={<CreatePost/>}></Route>


      </Routes> 

      <Footer></Footer>

    </userContext.Provider>

    </BrowserRouter>
  );
}
