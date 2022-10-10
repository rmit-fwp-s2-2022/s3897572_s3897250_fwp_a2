import { render, screen, fireEvent, getByRole, waitFor} from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { userContext } from "../Global_Pages/UserContext";
import user from "@testing-library/user-event";
import Signup from "./Signup";
import App from "../../App";
import { wait } from "@testing-library/user-event/dist/utils";

//Testing if the form has been submitted


// Sign up data testing -> We can this test by seeing if the profile manage stuff comes
  

// Login Testing, Sign up Testing, Testing if they follow validation and Profile Management Testing ()


// Validation?, Profile Features check if the name has been updated in state, If Sign up is successfully occurring, if textboxes are clearing out..


test("login form should be  within the document", () =>{

    render(<BrowserRouter> 
                        <userContext.Provider value={'15'}>
                         <Signup/> 
                         </userContext.Provider>
                         </BrowserRouter>
                        );
    const inputNode = screen.getByText("Sign-Up Form");
    expect(inputNode).toBeInTheDocument();
}
);


test("If Sign up is sucessfully occuring", () => {

    const mockFn = jest.fn();

    render(
    
    <BrowserRouter>

    <userContext.Provider value = {'parthivskill@gmail.com'}>

    <Signup handleSubmit = {mockFn}/>

    </userContext.Provider>

    </BrowserRouter>
    
    );

    const buttonNode = screen.getByRole("button")

    fireEvent.submit(buttonNode);

    expect(mockFn).toHaveBeenCalledTimes(1);


   }

);

// test build on one another, postive test/negative test (login fails pass), excpet mock value set up will be differnet., test something on edit side.




describe("If Sign up is sucessfully occuring different approach", () => {

    const mockFn = jest.fn();


    beforeEach(() => {
        
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(



        
        <BrowserRouter>

        <userContext.Provider value={"parthivskill@gmail.com"}>

        <Signup handleSubmit = {mockFn} setUser = {mockFn}/>

        </userContext.Provider>

        </BrowserRouter>
        
    );

    })

    

    it('OnSubmit is called when all fields pass validation',  async() => {
        const username = screen.getByRole('textbox', {
            name: /username/i
          })

        user.type(username, "parthivskill@gmail.com")

        const firstname = screen.getByRole('textbox', {
            name: /first name/i
          })

        user.type(firstname, "Parth")

        const lastname = screen.getByRole('textbox', {
            name: /last name/i
          })

        user.type(lastname, "Kulkarni")

        const password = screen.getByLabelText(/password/i) 

        user.type(password, "01877PARTHh!")


        user.click(screen.getByRole('button', {name: /sign up/i}));

        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);
        })


    })


   }

);

