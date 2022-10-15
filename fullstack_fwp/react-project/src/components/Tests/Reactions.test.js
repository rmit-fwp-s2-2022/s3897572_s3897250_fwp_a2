import { render, screen, fireEvent, getByRole, waitFor} from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { userContext } from "../Global_Pages/UserContext";
import { postContext } from "../Global_Pages/PostContext";
import user from "@testing-library/user-event";
import PostView from "../Posts/PostView";

// Testing reactions if like and dislike become highlighted when clicked and their counter goes up accordingly for posts with 0 likes. 


test("This test will check when like and dislike buttons are clicked they are highlighted and counter goes up accordingly", async() =>{

    const mockFn = jest.fn();

    const mockdataUser = {user_id:12134234, username: 'parthivskill@gmail.com', first_name: 'Parth', last_name: 'Kulkarni', date_joined: 'none'}
    const mockDataPosts = {title: "Look at this new Vscode Theme", body: "We need to integrate this asap", id: "1665618321801", image:"no-image",user_id:12134234}


    const setup = () =>  render( <BrowserRouter> <userContext.Provider value={{user:mockdataUser}}> <postContext.Provider value={{posts:mockDataPosts}}> 
                                <PostView like = {mockFn} setUser = {mockFn} posta = {mockDataPosts}/>
                                </postContext.Provider>
                                </userContext.Provider>
                                </BrowserRouter>

                                );
    

    setup(); // Call the method for rendering the component

    const counter = screen.getByRole('heading', {
        name: /0/i
      })

    const like_button = screen.getByTestId("like-button")

    user.click(like_button)


} )