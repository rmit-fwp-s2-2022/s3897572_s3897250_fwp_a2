import { render, screen, fireEvent, getByRole, waitFor} from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { userContext } from "../Global_Pages/UserContext";
import { postContext } from "../Global_Pages/PostContext";
import { getUser } from "../../data/repository";
import user from "@testing-library/user-event";
import Users from "../Posts/Users"

// Testing reactions if like and dislike become highlighted when clicked and their counter goes up accordingly for posts with 0 likes. 


test("This test will ensure that when you follow user its updated correctly on the context hook", () =>{

    const mockFn = jest.fn();

    const mockdataUser = {user_id:1665618266293, username: 'testingrecord', first_name: 'testingrecord', last_name: 'testingrecord', date_joined: 'none'}
    const mockDataPosts = {title: "req.body.title", body: "We need to integrate this asap", id: 1, image:"no-image",user_id:1665618266293}


    const setup = () =>  render( <BrowserRouter> <userContext.Provider value={{user:mockdataUser}}> <postContext.Provider value={{posts:mockDataPosts}}> 
                                <Users follow = {mockFn} unfollow = {mockFn} setUser = {mockFn} />
                                </postContext.Provider>
                                </userContext.Provider>
                                </BrowserRouter>

                                );
    

    setup(); // Call the method for rendering the component

    console.log("ayoo", getUser())



} )