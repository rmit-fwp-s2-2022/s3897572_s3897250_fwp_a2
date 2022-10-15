// Going to be testing that 600 characters or more it displays error or else dont display error. 
import { render, screen, fireEvent, getByRole, waitFor} from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { userContext } from "../Global_Pages/UserContext";
import user from "@testing-library/user-event";


import CreatePost from "../Posts/CreatePost"


describe("A postive and negative unit testing. 600 words more is negative and 600 words less is postive", () =>{

    const mockdata = {user_id:12134234, username: 'parthivskill@gmail.com', first_name: 'Parth', last_name: 'Kulkarni', date_joined: 'none'}

    const mockFn = jest.fn();
    
    let test_text = ''
    let negative_text = "this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, "
    let postive_text = "Intersting solution for unit testing, we need to further look into this and how it can raise our productivity."

    window.alert = () => {};



    const setup = () => render( <BrowserRouter> <userContext.Provider value={{user:mockdata}}> 
                                <CreatePost submitpost = {mockFn} setUser = {mockFn} text = {test_text}/>
                                </userContext.Provider>
                                </BrowserRouter>

                                );

    it("Executing negative test with >600 Characters and Provided Title", async () =>{

        test_text = negative_text

        setup()

        const title_input = screen.getByTestId("title-input-unit-testing")

        user.type(title_input, "Interesting Concept - Unit Testing, Unit Testing")

        user.click(screen.getByRole('button', { name: /submit post/i }));

                
        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledTimes(0);
        })
    
    })

    
    it("Executing postive test with <600 characters and Provided Title", async () =>{

        test_text = postive_text

        setup()

        const title_input = screen.getByTestId("title-input-unit-testing")

        user.type(title_input, "Interesting Concept - Unit Testing, Unit Testing")

        user.click(screen.getByRole('button', { name: /submit post/i }));

                
        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);
        })

    })

    })
    