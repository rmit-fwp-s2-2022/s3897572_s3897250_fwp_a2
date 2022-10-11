import { useNavigate, useParams } from 'react-router-dom';
import React, {useState, useRef, useContext, useEffect } from "react";
import Comment from './Comment';
import "./PostView.css"
import { userContext } from '../Global_Pages/UserContext';
import { postContext } from '../Global_Pages/PostContext';
import { findUser, updatePost, allReplies, createReply, singlePostFromUser, updateUser} from "../../data/repository";
import ReactQuill, {UnprivilegedEditor} from "react-quill";
import "quill/dist/quill.snow.css";



const PostView = (props) => {

    const {user, setUser} = useContext(userContext)
    const [curUser, setCurUser] = useState('')
    const {posts, setPosts} = useContext(postContext)
    const idObj = useParams()
    const [post, setPost] = useState("")
    const [postIndex, setPostIndex] = useState("")
    const [found, setFound] = useState(false)
    const [edit, setEdit] = useState(false)
    const [body, setBody] = useState(null)
    const [reply, setReply] = useState('')
    const [replies, setReplies] = useState([])
    const [followed, setFollowed] = useState(false)
    let navigate = useNavigate();
    let ref = useRef();


    useEffect(() => {

    }, [followed])
    

    async function getPostFromParams() {

            // Searches for the post from the given id of the url
            // using the useParams hook.

            let postObj = await singlePostFromUser(idObj.id)
            setPost(postObj)
            setFound(true)

            let crUser = await findUser(postObj.user_id)
            setCurUser(crUser)

            let replies = await allReplies(postObj)
            setReplies(replies)

            if (crUser.followers.includes(user.username)) {
                setFollowed(true)
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

        if(ref.current.value.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
            window.alert("A post cannot be empty.");
            return;
          }
        

        if(ref.current.value.length > 600){
            window.alert("Post cannot have more than 600 characters");
            return;
        }


        if ((ref.current.value.length > 0)) {

            post.body = ref.current.value
            setPost(post)
            setEdit(false)

            setBody('') 

            
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

            let newReply = await createReply(replyObj);

            let updatedPost = await singlePostFromUser(post.id)

            setPost(updatedPost)


            let replies = await allReplies(post)
            setReplies(replies)


            setReply("")
            ref.current.value =  ''

        }
        
        
        else {
            window.alert("You comment cannot be empty.")
        }

    }

    
    async function follow() {

        // Adds the current user to the following list
        // of the post's author in the form of a JSON object.


        let followerList = JSON.parse(curUser.followers)
        followerList.push(user.username)
        curUser.followers = JSON.stringify(followerList)
        
        let newCurUser = await updateUser(curUser)

        setFollowed(true)

    }

    async function unfollow() {

        let followerList = JSON.parse(curUser.followers)

        let indexRemoval = followerList.indexOf(user.username)
        followerList.splice(indexRemoval, 1)
        curUser.followers = JSON.stringify(followerList)
        
        let newCurUser = await updateUser(curUser)

        setFollowed(false)

    }


    if ((found === false)) {
            // Conditional to make sure a post is found to render
        getPostFromParams()
    }

    


    return (

        <div className='post-view'>

           
            <div className='following-buttons'>

                { followed === true? (
                    <button onClick = {unfollow} className='post-following'>Unfollow</button>
                ) :
                    <button onClick = {follow} className='post-following'>Follow</button>
                }

            </div>

            <h1 className='post-title'>{post.title}</h1> 
            <small className='post-created-by'> Post Created by: {curUser.first_name} {curUser.last_name}</small>
            <br></br>

            {edit === false ? (

                // If edit is false, show only delete and edit options


                <div className='post-upper'>
                    <p className='post-body'> <div dangerouslySetInnerHTML={{ __html: post.body}} /></p>
                    <div className='post-buttons'>
                        <button className='post-view-buttons' value={post.id} onClick={deletePost}>Delete post</button>
                        <button className='post-view-buttons' value={post.id} onClick={editing}>Edit post</button>
                    </div>

                            
                    <div className='comments'>

                        <div className='comments-add'>
                            <ReactQuill theme="snow" value = {reply} onChange={setReply} style={{ height: "180px" }} ref = {ref}/>
                            <button onClick={submitreply} className='add-comment'>Add a comment</button>
                        </div>

                        <div className='comment-section'>

                            {replies ? (

                                replies.map((reply) => (
                                    <div key = {reply.reply_id}>
                                        <hr color='gray' width = {900}></hr>
                                        <br></br>
                                        <div className='image-text'>
                                       
                                        <small className='user-info-comment'><b> {reply.user} {user.first_name} {user.last_name}</b></small>
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <div className='comment-text'>
                                        <Comment post={post} content={reply}/>
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

                        <ReactQuill theme="snow" defaultValue = {post.body} onChange={setBody} style={{ height: "180px" }} ref = {ref}/>
                        
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
