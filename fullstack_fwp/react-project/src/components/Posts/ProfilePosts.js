import { Link } from 'react-router-dom';
import React, { useState, useContext } from "react";
import {  useNavigate, useParams } from 'react-router-dom';
import "./ProfilePosts.css"
import { userContext } from '../Global_Pages/UserContext';
import {findUser} from "../../data/repository";


function ProfilePosts() {

    // Shows the posts from a specific user (based on their id)

    const {user, setUser} = useContext(userContext)
    const user_name_params = useParams()


    async function getaUser() {
        const userObj = await findUser(user_name_params.id)
    }

    getaUser()

    return (
        <div className='post-view'>
        

        </div>
    )

}


export default ProfilePosts


// {user.post.length > 0 ? (
//     <div><h1>{user.first_name}'s posts</h1></div>
// ):
//     <div className='no-posts-to-show'><h1>No posts to show :)</h1></div>
// }

// {

//     user.post.map((post) =>(
//         <div className='posts-snippet'>

//             {/* Creates multiple links (to PostView.js component) with the post id in the url to identify each post*/}
//             <Link key={post.id} to={`/PostView/${post.id}`} className = 'profile-post-links'><h1>Title: {post.title}</h1></Link>
//             <p>Content: {post.body}</p>
//         </div>
//     ))
// }