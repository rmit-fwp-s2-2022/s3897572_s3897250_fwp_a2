// import {  useNavigate, useParams } from 'react-router-dom';
// import React, {useState, useRef } from "react";
// import Comment from './Comment';
// import "./PostView.css"
// import { userContext } from '../Global_Pages/UserContext';
// import { postContext } from '../Global_Pages/PostContext';


// const PostView = () => {

//     const {user, setUser} = useContext(userContext)
//     const {posts, setPosts} = useContext(postContext)
//     const idObj = useParams()
//     const [post, setPost] = useState("")
//     const [postIndex, setPostIndex] = useState("")
//     const [found, setFound] = useState(false)
//     const [edit, setEdit] = useState(false)
//     const [body, setBody] = useState(null)
//     const [reply, setReply] = useState('')
//     let navigate = useNavigate();
//     let ref = useRef();
    

//     function getPostFromParams() {

//             // Searches for the post from the given id of the url
//             // using the useParams hook.

//         const userInfo = localStorage.getItem(user.loggedInUser)
//         const userParsed = JSON.parse(userInfo)


//         for (let i=0; i < userParsed.posts.length; ++i) {
//             if (userParsed.posts[i].id === parseInt(idObj.id)) {      // Compares id of post object in localstorage and id stored in URL
//                 setPost(userParsed.posts[i])
//                 setPostIndex(i)
//                 setFound(true)
//             }
//         }

//     }


//     function bodyinput(event) {
//         setBody(event.target.value)
//     }

//     function replyinput(event) {
//         setReply(event.target.value)
//     }


//     function deletePost(event) {

//             // Deletes the post (using the postsIndex to find
//             // which post to delete)
            
//         userParsed.posts.splice(postIndex, 1)
//         localStorage.setItem(user.loggedInUser, JSON.stringify(userParsed))
//         navigate(-1)
//         alert("Post deleted!")

//     }

//     function editing(){
//         setEdit(true)
//     };

//     function submit(event) {

//             // Submits the data from the form into html localstorage
//             // via setting a stringified json obj.


//         if ((userParsed.posts[postIndex].body != null) && (ref.current.value.length > 0)){

//             userParsed.posts[postIndex].body = ref.current.value;     
//             setUserParsed(userParsed)
//             setPost(userParsed.posts[postIndex])
//             localStorage.setItem(user.loggedInUser, JSON.stringify(userParsed))
//             setEdit(false)

//         } 
//         else{
//             window.alert("Post cannot be empty. ")
//         }


//     }


//     function submitreply() {

//         // Creates reply object from reply state, adds it to JSON object of
//         // user and saves it back to localstorage. reply and post states are
//         // reset. 

//         const replyObj = {
//             reply: reply,
//             user: user.loggedInUser,
//             id: Date.now(),
//             date: new Date(),
//             replies: [],
//         }


//         if (reply.length > 0) {

//             userParsed.posts[postIndex].replies.unshift(replyObj)
//             localStorage.setItem(user.loggedInUser, JSON.stringify(userParsed))

//             setPost(userParsed.posts[postIndex])
//             setReply("")
//             ref.current.value =  ''
//         }
        
        
//         else{
//             window.alert("You comment cannot be empty.")
//         }

//     }




//     if ((found === false)) {
//             // Conditional to make sure a post is found to render
//         getPostFromParams()
//     }

    



//     return (

//         <div className='post-view'>

                        
//         </div>
//     )

// }

// export default PostView