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
    

    function getPostFromParams() {

            // Searches for the post from the given id of the url
            // using the useParams hook.

        for (let post of posts) {
            if (post.id === parseInt(idObj.id)) {
                setPost(post)
                console.log(post)
                setFound(true)
            }
        }

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

        console.log(replyObj)
        await createReply(replyObj);

        let ok = await singlePostFromUser(post)
        console.log(ok)

        // let updatedPost = await getPostFromUser(post.id)
        // console.log(updatedPost)





        // if (reply.length > 0) {

        //     await createReply(replyObj)

        //     // setPost(userParsed.posts[postIndex])
        //     setReply("")
        //     ref.current.value =  ''

        // }
        
        
        // else {
        //     window.alert("You comment cannot be empty.")
        // }

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

            <button onClick={submitreply}></button>
                        
        </div>
    )

}

export default PostView


// Tasks left:
//      - Make new replies state to hold replies
//      - Map out replies/users in html
//      - Implement comments component
