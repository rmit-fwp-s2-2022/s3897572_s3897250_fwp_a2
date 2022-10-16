// Going to be testing that 600 characters or more it displays error or else dont display error. 
import { render, screen, fireEvent, getByRole, waitFor} from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { userContext } from "../Global_Pages/UserContext";
import user from "@testing-library/user-event";


import CreatePost from "../Posts/CreatePost"


/*General Testing Information:

  Passed down context and browser within the render as this was how it was set up within our App.js 

  https://testing-playground.com/ - Used this for identifying DOM Elements

*/


/*Justification: Here we tested whether the quill editor or post input-box can handle the validation of 600 characters
                 and less than 600 characters. A negative and positive test in essence. 

                 We tried to find the quill editor through testing-playground but were unsuccessful, so we initialized the
                 state with negative_text (Greater than 600 Characters) for the negative test and positive_text (Less than 600
                 Characters) via props. A prop was also set up in the sumbitpost function to check whether it was successfully posted
                 or not.  

                 This test was done to again make sure that the character limit is working as expected, and has no underlying
                 logical bugs.

*/


describe("A postive and negative unit testing. 600 words more is negative and 600 words less is postive", () =>{

    const mockdata = {user_id:12134234, username: 'parthivskill@gmail.com', first_name: 'Parth', last_name: 'Kulkarni', date_joined: 'none'}

    const mockFn = jest.fn();
    
    let test_text = ''
    let negative_text = "this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, this is a test for 600 characters, "
    let postive_text = "Intersting solution for unit testing, we need to further look into this and how it can raise our productivity."

    window.alert = () => {}; // Used to supress window.alert() warnings within jest



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
    