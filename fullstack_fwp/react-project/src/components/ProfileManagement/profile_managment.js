import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext} from "react";
import './profile_manage.css';
import { emailError, nameError, emailCheck_ProfileChange } from '../Validation_rules/validation'
import { userContext } from '../Global_Pages/UserContext';
import {deleteUser, updateUser, createUser} from "../../data/repository";


const ProfileManage = (props) => {

    const {user, setUser} = useContext(userContext)

    const updated_obj = {...user};

    const imageLink = updated_obj.profile_pic;
    const[updatedfirstname, setnewfirstname] = useState(updated_obj.first_name);
    const[updatedlastname, setnewlastname] = useState(updated_obj.last_name);
    const originalemail = updated_obj.email;
    const[updatedemail, setnewemail] = useState(updated_obj.username); 
    const[valid, setValid] = useState(null);
    
    const navigate = useNavigate();


    useEffect(() => {  // As soon as valid is set to true the the useEffect function is executed
        
        if (valid) {
            validate();
            redirect();
        }

        console.log(valid)

    })

    
    function setfirstName(e) {
        setnewfirstname(e.target.value);

    }

    function setlastName(e) {
        setnewlastname(e.target.value);
    }

    function setemail(e) {
        setnewemail(e.target.value);
    }

    function handleSave(e) {
        e.preventDefault();
        validate();

    }

    function cancelChanges() {
        navigate(-1)
    
    }

        // Validates updated information
    function validate() {


        if (updatedemail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && updatedfirstname.match(/^[a-zA-Z]+$/) 
            && updatedlastname.match(/^[a-zA-Z]+$/))
        {
            setValid(true)

            updated_obj.first_name = updatedfirstname;
            updated_obj.last_name = updatedlastname;
            updated_obj.username = updatedemail;
          

            console.log("Login set to true")
            
        }
        else {
            setValid(false)

        }   

    }


        // Updates user information and sets it in the database, if valid is set to true
    async function redirect() {

        console.log("deleting", user)

        await deleteUser(user)

        console.log("Creating", updated_obj)

        await createUser(updated_obj)

        setUser(updated_obj)

        console.log("navigating...")

        navigate('/Profile')

    }
    

    return(
        <div className='profile-container-manage'>
            <div className='profile-info-manage'>
                <h1 className='profile-title-manage'>Edit Your Profile</h1>
                <div className='img-logo-manage'>
                    <img className='user-profile-img-manage' src = {`data:image/jpg;base64,${imageLink}`} alt=""></img>
    
                </div>

                <div className='user-container-manage'>

                    <h3> Update Your Details Below and Save Changes: </h3>


                    <div className='form-manage'>

                        <form onSubmit={handleSave}>   

                        <div className= 'user-info-manage'>
                            <label> First Name:</label>
                            <input type = "text" className='input-manage' defaultValue = {updated_obj.first_name} onChange = {setfirstName}></input>
                            {nameError(valid, updatedfirstname)}
                        </div>

                        <div className= 'user-info-manage'>
                            <label> Last Name:</label>
                            <input type = "text" defaultValue = {updated_obj.last_name} onChange = {setlastName}></input>
                            {nameError(valid, updatedlastname)}
                        </div>

                        <div className='user-info-manage'>
                            <label> Your Email:</label>
                            <input type= "text" defaultValue = {updated_obj.username} onChange = {setemail}></input>
                            {emailError(valid, updatedemail)}
                            {emailCheck_ProfileChange(originalemail, updatedemail)}

                        </div>

                        <div className='cancel-save-buttons'>
                            <button className='delete-account' onClick={cancelChanges}> Cancel Operation</button>
                            <button type='submit' className='delete-account' > Save Changes</button>
                        </div>

                        </form>
                    
                    </div>

        

                </div>
            
            </div>

    </div>
        

    )

}


export default ProfileManage