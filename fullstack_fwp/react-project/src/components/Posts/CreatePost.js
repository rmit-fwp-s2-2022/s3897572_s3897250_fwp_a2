import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext, useRef} from "react";
import "./CreatePost.css"
import { userContext } from '../Global_Pages/UserContext';
import { createPost, createReactions } from "../../data/repository";
import ReactQuill, {UnprivilegedEditor} from "react-quill";
import "quill/dist/quill.snow.css";

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

        if (((body.replace(/<(.|\n)*?>/g, "").trim().length === 0)) || (title === "")) {
            alert("Post or Title cannot be empty")
        }
        else if ((body.length > 600)) {
            alert("Post cannot have more than 600 characters")
        }

        else {

            // Post is valid and added to localstorage
            
            let post_id = parseInt(Date.now())

            const post = {
                title: title,
                username: user.username,
                user_id: user.user_id,
                body: body,
                id: post_id,
                image: image.length > 0 ? image : "no-image"
            }

            const reactions = {
                id: post_id,
                reactions_id: parseInt(Date.now()),
            }


            // Add the Post to the database with the foreign
            // key as the primary key of the User table.

            await createPost(post)
            await createReactions(reactions)

            await image

            // navigate("/ProfilePost)
            navigate(`/ProfilePosts/${user.user_id}`)
            alert("New post created!")

        }

    }

    function cancelpost(){
        navigate('/Profile')
    }


    return (

        <div className="row-create">

        <div className='img-container-better'>

        <img src = "/images/Create_Page/interactions-better.png" className='interaction-better-img' alt=''></img>

        </div>


        <div className="column">

        <div className='create-post-container'>
            
            <div className='create-post'>
                <h1>Create a post</h1>
                <p>Post will be created by: {user.username}</p>
            </div>

            <div className='post-form'>
                <form className='post-input'>
                    <label htmlFor='title'></label>
                    <input className='title-input' type='text' placeholder='Enter title' onChange={titleinput} maxLength = {150}></input>
                </form>

                <form className='post-input'>
                    <label htmlFor='text'></label>
                    <div className='quill-editor'>
                    <ReactQuill theme="snow" value = {body} onChange={setBody} style={{ height: "180px" }} ref = {ref}/>
                    </div>
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

                             <img src={(image)} onError={handleBrokenImage} alt = 'No visual to display' className='preview-resize' height={300} width = {700}></img>

                        </div>
                    </div>
                    
            </div>
            )}

            {!image && (

                <div className='no-image-uploaded-message'>

                    <h3>You have not selected an image to upload with this post</h3>
                </div>
            
            )}

        </div>

        </div>   



        </div>
                
    
    
    )

}


export default CreatePost