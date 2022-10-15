import { render, screen, fireEvent, getByRole, waitFor} from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { userContext } from "../Global_Pages/UserContext";

import user from "@testing-library/user-event";
import Signup from "../Home_Page/Signup";
import Login from "../Home_Page/Login";
import Profile from "../Profile_Page/Profile";
//Testing if the form has been submitted





/// 

// Key UI Elements: Sign Up: Form inputs and the signup button - test whether these exist within the document
                   // Login - Interaction test, give inputs and capute errors and then give inputs again
                   // API Functions in front end in sign up, profile , login
                   // Profile Managment when user changes details the value in context is also changed.. test that 



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


   });



describe("Testing with invalid inputs during sign-up and then with valid inputs.", () => {

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


    it("Testing with all blank inputs", async() => {

        user.click(screen.getByRole('button', {name: /sign up/i}));

        await waitFor(() =>{
            expect(mockFn).toHaveBeenCalledTimes(0) // It will be called 0 times it will not go through
                                                    // to submission (handleSumbit line 38..)
        })

        expect(await screen.findByText("Username is required.")).toBeInTheDocument();
        expect(await screen.findByText("First name is required.")).toBeInTheDocument();
        expect(await screen.findByText("Last name is required.")).toBeInTheDocument();
        expect(await screen.findByText("Password is required.")).toBeInTheDocument();


        const username = screen.getByRole('textbox', {
            name: /username/i
          })

        user.type(username, "parthivskillgmail.com")


        const firstname = screen.getByRole('textbox', {
            name: /first name/i
          })

        user.type(firstname, "Parth67")

        const lastname = screen.getByRole('textbox', {
            name: /last name/i
          })

        user.type(lastname, "KuKIA889lkarni")

        const password = screen.getByLabelText(/password/i) 

        user.type(password, "01877PARTHhxasiduoakldasdioasiodasdioasdiouasiodauo!")


        user.click(screen.getByRole('button', {name: /sign up/i}));

        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledTimes(0);
        })

        expect(await screen.findByText("Email formatting is not correct.")).toBeInTheDocument();
        expect(await screen.findByText("First Name cannot contain symbols or numbers")).toBeInTheDocument();
        expect(await screen.findByText("Last Name cannot contain symbols or numbers")).toBeInTheDocument();
        expect(await screen.findByText("Passwords should contain 8 to 15 characters, one uppercase letter, one numeric digit and one special character")).toBeInTheDocument();



        

    
    })


})


describe("Login working with user that is already in the database and user not in the database - POSTIVE NEGATIVE TESTING", () => {

    
    const mockFn = jest.fn();


    beforeEach(() => {
        
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(

        <BrowserRouter>

        <userContext.Provider value={"parthivskill@gmail.com"}>

        <Login handleSubmit = {mockFn} setUser = {mockFn}/>

        </userContext.Provider>

        </BrowserRouter>
        
    );

    });

    it("Executing Positive Test with user that exists in db", async () =>{

        const user_name_postive = 'testingrecord'
        const password_user_postive =  'abc123'

        const username = screen.getByRole('textbox', {
            name: /username/i
        })

        user.type(username, user_name_postive)


        const password = screen.getByLabelText(/password/i)

        user.type(password, password_user_postive)

        user.click(screen.getByRole('button', {name: /login/i}));

        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);
        })


    
    })
    
    

    it("Executing Negative Test with user that does not exists in db", async () => {

        const user_name_postive = 'testingrecord_'
        const password_user_postive =  'abc1231'

        const username = screen.getByRole('textbox', {
            name: /username/i
        })

        user.type(username, user_name_postive)


        const password = screen.getByLabelText(/password/i)

        user.type(password, password_user_postive)

        user.click(screen.getByRole('button', {name: /login/i}));

        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledTimes(0);
        })

    
    
    })

})


test("Testing whether if user changes their details, it's again reflected on the profile page", () =>{

    const mockdata = {user_id:12134234, username: 'parthivskill@gmail.com', first_name: 'Parth', last_name: 'Kulkarni', date_joined: 'none'}
                     // In the DB the user table contains more attributes, but they are not necessary here for our testing purposes.

    render(
        <BrowserRouter>
        <userContext.Provider value={{user: mockdata}}>
            <Profile/>
        </userContext.Provider>
        </BrowserRouter>

        )
    

    expect(screen.getByTestId('email')).toHaveTextContent(mockdata.username);
    expect(screen.getByTestId('name')).toHaveTextContent(mockdata.first_name);
    expect(screen.getByTestId('name')).toHaveTextContent(mockdata.last_name);

    })

 










    