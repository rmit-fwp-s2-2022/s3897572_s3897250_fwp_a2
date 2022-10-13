import { useNavigate, useParams } from 'react-router-dom';
import React, {useState, useRef, useContext, useEffect } from "react";
import Comment from './Comment';
import "./PostView.css"
import { userContext } from '../Global_Pages/UserContext';
import { postContext } from '../Global_Pages/PostContext';
import { findUser, updatePost, allReplies, createReply, singlePostFromUser, updateUser, deletePost, updateReactions, getReactions } from "../../data/repository";
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
    const [isViewPoster, setViewPoster] = useState(null)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)


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

            console.log(user.user_id, "user", postObj.user_id, "post")

            if (user.user_id === postObj.user_id){
                console.log("Executed")
                setViewPoster(true)
            }

            let crUser = await findUser(postObj.user_id)
            setCurUser(crUser)

            let replies = await allReplies(postObj)
            setReplies(replies)

            if (crUser.followers.includes(user.username)) {
                setFollowed(true)
            }



            // Check if user reactions for post and adjust state accordingly

            let reactions = await getReactions(postObj.id)
            let likedList = JSON.parse(reactions.peopleWhoHaveLiked)
            let dislikedList = JSON.parse(reactions.peopleWhoHaveDisliked)

            if (likedList.includes(user.username)) {
                setLiked(true)
                setDisliked(false)
            }
            else if (dislikedList.includes(user.username)) {
                setDisliked(true)
                setLiked(false)
            }
            else {

            }

            setLikeCount(reactions.likeCount)
    }


    function bodyinput(event) {
        setBody(event.target.value)
    }

    function replyinput(event) {
        setReply(event.target.value)
    }


    async function HandledeletePost(event) {

            // Deletes the post (using the postsIndex to find
            // which post to delete) 

        await deletePost(post.id)

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

    

    async function like() {
        // Update like section of posts reaction table record
        // Set's true for liked state.

        if (liked === false) {

            let reactions = await getReactions(post.id)
            let likedUsers = JSON.parse(reactions.peopleWhoHaveLiked)
            let dislikedUsers = JSON.parse(reactions.peopleWhoHaveDisliked)
            let indexRemoval = dislikedUsers.indexOf(user.username)

            if (indexRemoval === -1) {      // if user has not liked, add to disliked
                likedUsers.push(user.username)
            }
            else {      // else if user has liked but has now disliked, take user out from liked and into disliked
                dislikedUsers.splice(indexRemoval, 1)
                likedUsers.push(user.username)
            }

            reactions.peopleWhoHaveLiked = JSON.stringify(likedUsers)
            reactions.peopleWhoHaveDisliked = JSON.stringify(dislikedUsers)
        
            // Update counter
            if (disliked) {
                reactions.likeCount = reactions.likeCount + 2
            }
            else {
                reactions.likeCount = reactions.likeCount + 1
            }


            await updateReactions(reactions)

            setLikeCount(reactions.likeCount)
            setLiked(true)
            setDisliked(false)

        }
    }


    async function dislike() {
        // Update dislike section of posts reaction table record
        // Set's true for disliked state.


        if (disliked === false) {

            let reactions = await getReactions(post.id)
            let likedUsers = JSON.parse(reactions.peopleWhoHaveLiked)
            let dislikedUsers = JSON.parse(reactions.peopleWhoHaveDisliked)
            let indexRemoval = likedUsers.indexOf(user.username)

            if (indexRemoval === -1) {      // if user has not liked, add to disliked
                dislikedUsers.push(user.username)
            }
            else {      // else if user has liked but has now disliked, take user out from liked and into disliked
                likedUsers.splice(indexRemoval, 1)
                dislikedUsers.push(user.username)
            }

            reactions.peopleWhoHaveLiked = JSON.stringify(likedUsers)
            reactions.peopleWhoHaveDisliked = JSON.stringify(dislikedUsers)

            // Update counter
            if (liked) {
                reactions.likeCount = reactions.likeCount - 2
            }
            else {
                reactions.likeCount = reactions.likeCount - 1
            }


            await updateReactions(reactions)


            setLikeCount(reactions.likeCount)
            setDisliked(true)
            setLiked(false)
            
        }
    }

    // - Relate post with reactions
    // - Have a method to check for the columns for their values
    // - If the value is true for a certain reaction (column), load it in state
    // - Use the state to render the 











    return (

        <div className='post-container'>

        <div className='post-container-banner'>

            <h3> Post Title:  {post.title}</h3>
            <small className='post-created-by'> Post Created by: {curUser.first_name} {curUser.last_name}</small>


        </div>

        <div className='post-view-view'>
        
        {edit === false &&

            <div className='top-button-container'>


                { liked === false && disliked === false ? (
                    
                        <div className='like-dislike-buttons'>
                            <button onClick={like}>Like</button>
                            <h4>{likeCount}</h4>
                            <button onClick={dislike}>Dislike</button>
                        </div>

                ):

                    <div>
                        { liked ? (
                            <div className='like-dislike-buttons'>
                                <button style={{backgroundColor: 'red', borderStyle: 'none'}} onClick={like}>Liked</button>
                                <h4>{likeCount}</h4>
                                <button onClick={dislike}>Dislike</button>
                            </div>
                        ):
                            <div className='like-dislike-buttons'>
                                <button onClick={like}>Like</button>
                                <h4>{likeCount}</h4>
                                <button style={{backgroundColor: 'red', borderStyle: 'none'}} onClick={dislike}>Disliked</button>
                            </div>
                        }
                    </div>

                }



                <div className='post-information'>
                    <p className='post-title'>{post.title}</p> 
                </div>

                <div className='following-buttons'>

                    { followed === true ? (
                        <button onClick = {unfollow} className='post-following' disabled = {isViewPoster}>Unfollow {curUser.first_name}</button>
                    ) :
                        <button onClick = {follow} className='post-following' disabled = {isViewPoster}>Follow {curUser.first_name}</button>
                    }

                </div>

            </div>

            }
            
    
            {edit === false ? (

                // If edit is false, show only delete and edit options


                <div className='post-upper'>
                    <p className='post-body'> <div dangerouslySetInnerHTML={{ __html: post.body}} /></p>
                    <div className='post-buttons'>
                        {/* {console.log(isViewPoster,  "ayoo viewer")} */}
                        <button className='post-view-buttons' value={post.id} onClick={HandledeletePost} disabled = {!isViewPoster}>Delete post</button>
                        <button className='post-view-buttons' value={post.id} onClick={editing} disabled = {!isViewPoster}>Edit post</button>
                    </div>

                    <div className='image-rendering'>

                        {console.log(post.image)}

                            {post.image !=='no-image' &&(
                            <img src={post.image} alt = '' className = 'image-rendered-post-view'  onerror="this.style.display='none'"></img>
                            )}

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

                    <div className='post-information'>
                        <p className='post-title'>Post Title : {post.title}</p> 
                    </div>

                    <ReactQuill theme="snow" defaultValue = {post.body} onChange={setBody} style={{ height: "180px" }} ref = {ref}/>
                    
                    <div className='post-buttons'>
                        <button className='post-view-buttons' onClick={submit}>Submit</button>
                    </div>

                </div>

            </div>

            }

                    
    </div>

    </div>

)

}

export default PostView


// Tasks left:
//      - Make new replies state to hold replies
//      - Map out replies/users in html
//      - Implement comments component


