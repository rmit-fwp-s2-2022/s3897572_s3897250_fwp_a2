import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import './profile_manage.css';
import { emailError, nameError, emailCheck_ProfileChange } from '../Validation_rules/validation'
import {updateUser} from "../../data/repository";


const ProfileManage = (props) => {
    
    const [userInfo, setUserInfo] = useState(props.loggedInUser)
    const imageLink = userInfo['profile_pic']
    const[updatedfirstname, setnewfirstname] = useState(userInfo.first_name)
    const[updatedlastname, setnewlastname] = useState(userInfo.last_name)
    const originalemail = userInfo.email
    const[updatedemail, setnewemail] = useState(userInfo.email) 
    const[valid, setValid] = useState(null)
    const navigate = useNavigate();


    useEffect(() => {  // As soon as valid is set to true the the useEffect function is executed
        
        if (valid) {
            props.loginUser(userInfo)
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

            userInfo.first_name = updatedfirstname;
            userInfo.last_name = updatedlastname;
            userInfo.email = updatedemail;
            setUserInfo(userInfo)


            console.log("Login set to true")
            
        }
        else {
            setValid(false)

        }   

    }


        // Updates user information and sets it in the database, if valid is set to true
    async function redirect() {

        console.log(userInfo)

        const updated =  await updateUser(userInfo);

        props.onLogin(updated)

        navigate('/')

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
                            <input type = "text" className='input-manage' defaultValue = {userInfo.first_name} onChange = {setfirstName}></input>
                            {nameError(valid, updatedfirstname)}
                        </div>

                        <div className= 'user-info-manage'>
                            <label> Last Name:</label>
                            <input type = "text" defaultValue = {userInfo.last_name} onChange = {setlastName}></input>
                            {nameError(valid, updatedlastname)}
                        </div>

                        <div className='user-info-manage'>
                            <label> Your Email:</label>
                            <input type= "text" defaultValue = {userInfo.email} onChange = {setemail}></input>
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