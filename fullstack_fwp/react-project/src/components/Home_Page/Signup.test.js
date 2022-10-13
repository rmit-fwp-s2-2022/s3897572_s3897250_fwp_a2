import { render, screen, fireEvent, getByRole, waitFor} from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import { userContext } from "../Global_Pages/UserContext";
import {within} from '@testing-library/dom'
import { useContext, useState } from "react";

import user from "@testing-library/user-event";
import Signup from "./Signup";
import Login from "./Login";
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



describe("Testing with invalid inputs during sign-up and then with valid inputs, then to finally submit the form", () => {

    it("Testing with invalid inputs, and see if they are being captured correctly", async() => {

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


})


test("Testing if key elements(inputs and sign up button) in the sign-up form exist", () => {

    
        
        // eslint-disable-next-line testing-library/no-render-in-setup
    const {container} = render(

        <BrowserRouter>

        <userContext.Provider value={"parthivskill@gmail.com"}>

        <Signup/>

        </userContext.Provider>

        </BrowserRouter>
        
    );




    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const inputNode_username = container.querySelector('#username');
    expect(inputNode_username).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const inputNode_userfirstname = container.querySelector('#firstname');
    expect(inputNode_userfirstname).toBeInTheDocument();
    
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const inputNode_userlastname = container.querySelector('#lastname');
    expect(inputNode_userlastname).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const inputNode_userpassword = container.querySelector('#password');
    expect(inputNode_userpassword).toBeInTheDocument();

    const button_signup = screen.getByRole("button");
    expect(button_signup).toBeInTheDocument();

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



/*

describe("Checking whether the userContext the value that user signs with is reflected on the screen", () => {

    const mockdata = {user_id:12134234, user_name: 'parthivskill@gmail.com', first_name: 'Parth', last_name: 'Kulkarni', date_joined: 'none'}
                     // In the DB the user table contains more attributes, but they are not necessary here for our testing purposes.

    const setUser = jest.fn(mockdata)                 
    
    render(
        <BrowserRouter>
        <userContext.Provider value={{addItem}}>
            <Profile />
        </userContext.Provider>
        </BrowserRouter>

        )

    
    it("Check whether the signed up user value that is supposdely stored in context is correct dipslaying on site", () => {
        expect(screen.getByText("parthivskill@gmail.com")).toBeInTheDocument();
    })



//https://polvara.me/posts/mocking-context-with-react-testing-library




})



describe("Testing whether if user changes their details, it's again reflected on the profile page", () =>{

    const mockdata = {user_id:12134234, user_name: 'parthivskill@gmail.com', first_name: 'Parth', last_name: 'Kulkarni', date_joined: 'none'}
                     // In the DB the user table contains more attributes, but they are not necessary here for our testing purposes.

    render(
        <BrowserRouter>
        <userContext.Provider value={"parthivskill@gmail.com"}>
            <Profile/>
        </userContext.Provider>
        </BrowserRouter>

        )




})


*/ 










    