import { useNavigate, useParams } from 'react-router-dom';
import React, {useState, useRef, useContext } from "react";
import Comment from './Comment';
import "./PostView.css"
import { userContext } from '../Global_Pages/UserContext';
import { postContext } from '../Global_Pages/PostContext';
import {deletePost, updatePost, allReplies, createReply, singlePostFromUser, getPostFromUser} from "../../data/repository";


const PostView = () => {

    const {user, setUser} = useContext(userContext)
    const {posts, setPosts} = useContext(postContext)
    const idObj = useParams()
    const [post, setPost] = useState("")
    const [postIndex, setPostIndex] = useState("")
    const [found, setFound] = useState(false)
    const [edit, setEdit] = useState(false)
    const [body, setBody] = useState(null)
    const [reply, setReply] = useState('')
    let navigate = useNavigate();
    let ref = useRef();
    

    async function getPostFromParams() {

            // Searches for the post from the given id of the url
            // using the useParams hook.

            let postObj = await singlePostFromUser(idObj.id)
            setPost(postObj)
            setFound(true)

    }


    function bodyinput(event) {
        setBody(event.target.value)
    }

    function replyinput(event) {
        setReply(event.target.value)
    }


    async function deletePost(event) {

            // Deletes the post (using the postsIndex to find
            // which post to delete)
            

        await deletePost(post)

        navigate(-1)
        alert("Post deleted!")

    }

    function editing() {
        setEdit(true)
    };


    async function submit(event) {

            // Submits the data from the form into html localstorage
            // via setting a stringified json obj.


        if ((post.body != null) && (ref.current.value.length > 0)) {

            post.body = ref.current.value
            setPost(post)
            setEdit(false)

            
            await updatePost(post)

        } 
        else {
            window.alert("Post cannot be empty. ")
        }


    }


    async function submitreply() {

        // Should submit a reply.

        // Should also update post object in state 
        // by retrieving it from the database again.



        let curDate = new Date()
        curDate = JSON.stringify(curDate)

        const replyObj = {
            reply_id: parseInt(Date.now()),     // Primary key: always unique
            id: post.id,        // Foreign key: id of the post
            reply: reply,
            user: user.username,
            date: curDate,
        }


        if (reply.length > 0) {

            await createReply(replyObj);

            let updatedPost = await singlePostFromUser(post.id)

            setPost(updatedPost)

            console.log(replyObj.reply)

            setReply("")
            ref.current.value =  ''

        }
        
        
        else {
            window.alert("You comment cannot be empty.")
        }

    }




    if ((found === false)) {
            // Conditional to make sure a post is found to render
        getPostFromParams()
    }

    



    return (

        <div className='post-view'>

            <h1 className='post-title'>{post.title}</h1> 
            <small className='post-created-by'> Post Created by: {user.first_name} {user.last_name}</small>
            <br></br>

            {edit === false ? (

                // If edit is false, show only delete and edit options


                <div className='post-upper'>
                    <p className='post-body'>{post.body}</p>
                    <div className='post-buttons'>
                        <button className='post-view-buttons' value={post.id} onClick={deletePost}>Delete post</button>
                        <button className='post-view-buttons' value={post.id} onClick={editing}>Edit post</button>
                    </div>


                    <div className='image-rendering'>

                        {console.log(post.image)}

                            {post.image &&(
                            <img src={post.image} alt = 'Displayed Visual' className = 'image-rendered-post-view'></img>
                            )}

                    </div>
                            
                    <div className='comments'>

                        <div className='comments-add'>
                            <textarea onChange={replyinput} placeholder="Add a comment to this post" ref = {ref}></textarea>
                            <button onClick={submitreply} className='add-comment'>Add a comment</button>
                        </div>

                        <div className='comment-section'>

                            {post.replies ? (

                                post.replies.map((reply) => (
                                    <div key = {reply.reply_id}>
                                        <hr color='gray' width = {900}></hr>
                                        <br></br>
                                        <div className='image-text'>
                                        {<img className='profile-picture-comments' src={`data:image/jpg;base64,${user.profile_pic}`} alt = 'User Chosen Profile'></img>}
                                        <small className='user-info-comment'><b> {reply.user} {user.first_name} {user.last_name}</b></small>
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <div className='comment-text'>
                                        <Comment postIndex={postIndex} loggedIn={user.loggedInUser} content={reply}/>
                                            {/* New componenet, Comment, to render the comments to a post with following props */}
                                        </div>

                                    </div>
                                ))

                            ) :

                                <div><h1>No comments on this post yet :)</h1></div>

                            }
                            
                        </div>

                    </div>

                </div>

                ) : 

                // Else if edit is true, show body in textarea for editing, submit button and image.


                <div>
                    <div className='post-upper'>

                        <textarea className='post-upper-textarea' cols="79" rows="20" defaultValue={post.body} onChange={bodyinput} ref = {ref}></textarea>

                        
                        <div className='post-buttons'>
                            <button className='post-view-buttons' onClick={submit}>Submit</button>
                        </div>

                    </div>

                </div>

                }

                        
        </div>
    )

}

export default PostView


// Tasks left:
//      - Make new replies state to hold replies
//      - Map out replies/users in html
//      - Implement comments component
