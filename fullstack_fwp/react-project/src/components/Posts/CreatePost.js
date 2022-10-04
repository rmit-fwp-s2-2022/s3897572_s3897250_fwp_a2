import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext, useRef} from "react";
import "./CreatePost.css"
import { userContext } from '../Global_Pages/UserContext';
import {createPost} from "../../data/repository";

function CreatePost() {

    const {user, setUser} = useContext(userContext)

    const [body, setBody] = useState("")
    const [title, setTitle] = useState("")
    const [image, setImage] = useState('')
    const [invalidimage, setInvalid] = useState(null)
    const navigate = useNavigate()
    const ref = useRef(null)


    function bodyinput(event) {
        setBody(event.target.value)
    }

    function titleinput(event) {
        setTitle(event.target.value)
    }

    function handleImage(event) {
        setImage(event.target.value)
    }

    // Removes image from page using ref hook
    function removeSelectedImage() {
        setImage('')
        ref.current.value = ''
    }

    function handleBrokenImage() {
        setImage(null)
        setInvalid(true)
    }

        // Displays error if image is Broken
    function displayError() {

        if ((setInvalid) && (image === null)){
            return (
                <div className='AlertMessage'> Image Link is Incorrect</div>
            )
        } 

        else if ((setInvalid) && (image !== null) && (image.length > 0)){
            return(
                <div className='AlertMessage'> Image Loaded Below</div>
            )
        }
    }



    async function submitpost() {

        console.log("executed")

        // Creates a post object and then adds it to posts attribute
        // in local storage.

        if (((body === "") || (title === ""))) {
            alert("Post or Title cannot be empty")
        }
        else if ((body.length > 250)) {
            alert("Post cannot have more than 250 characters")
        }
        else {

            // Post is valid and added to localstorage
        
            const post = {
                title: title,
                username: user.username,
                body: body,
                id: parseInt(Date.now()),
                image: image.length > 0 ? image : "no-image"
            }


            // Add the Post to the database with the foreign
            // key as the primary key of the User table.

            await createPost(post)

            // navigate("/ProfilePost)
            navigate("/ProfileManagement")
            alert("New post created!")

        }

    }

    function cancelpost(){
        navigate('/Profile')
    }


    return (
        <div className='create-post-container'>
            
            <div className='create-post'>
                <h1>Create a post</h1>
            </div>

            <div className='post-form'>
                <form className='post-input'>
                    <label htmlFor='title'></label>
                    <input className='title-input' type='text' placeholder='Enter title' onChange={titleinput} maxLength = {150}></input>
                </form>

                <form className='post-input'>
                    <label htmlFor='text'></label>
                    <textarea placeholder='write something....' onChange={bodyinput}></textarea>
                </form>
            </div>
            
            <div className='post-buttons'>
                <label>Add Image with Post -- Enter URL: (Can be Local or Image Address Sourced Online)</label>
                <input type="text" placeholder='https://...' className = 'image-upload-input' onChange = {handleImage} name ='upload' ref={ref}/>
            </div>

            <div className='image-link-error'>

                {displayError()}

            </div>

            <div className='submit-button'>
                <button onClick={cancelpost} className = 'create-post-cancel-button'> Cancel Post Creation </button>
                <button onClick={submitpost} className = 'create-post-submit-button'>Submit Post</button>

            </div> 

            {image && (
            
                <div className='image-preview-container'>
                    <div className='image-cancel'>
                        <button onClick={removeSelectedImage} className = 'remove-image-button'> Remove This Image </button>
                    </div>           
                
                    <div className='image-container'>
                        <div className='image-cancel'>

                             <img src={(image)} onError={handleBrokenImage} alt = 'No visual to display' className='preview-resize' height={1000} width = {700}></img>

                        </div>
                    </div>
                    
            </div>
            )};   



        </div>
                
    
    
    )

}


export default CreatePost