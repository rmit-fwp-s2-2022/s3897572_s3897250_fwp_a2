import { Link } from 'react-router-dom';
import React, { useState, useContext, useEffect } from "react";
import {  useNavigate, useParams } from 'react-router-dom';
import "./ProfilePosts.css"
import { userContext } from '../Global_Pages/UserContext';
import {getPostFromUser, getPosts, findUser} from "../../data/repository";
import { postContext } from '../Global_Pages/PostContext';
import PostView from './Comment';


function ProfilePosts() {

    // Shows some of profiles information, and:
    // Shows the posts from a specific user (based on their id)

    const {user, setUser} = useContext(userContext)
    const [curUser, setCurUser] = useState('')
    const [posts, setPosts] = useState([])
    const user_name_params = useParams()


    useEffect(() => {
        getaUsersPost()
    }, [])


    // Retrieves the posts of a specific user
    async function getaUsersPost() {

        let userFromParams = await findUser(user_name_params.id)
        setCurUser(userFromParams)
        
        let postsObj = await getPostFromUser(user_name_params.id)
        console.log(postsObj)
        setPosts(postsObj)
        
    }


    
    
    return (
        <div className='post-view'>
                    

            {posts.length > 0 ? (
                    <div><h1>{curUser.first_name}'s posts</h1></div>
                ):
                    <div className='no-posts-to-show'><h1>No posts to show :)</h1></div>
                }

                {

                    posts.map((post) =>(
                        <div className='posts-snippet'>

                            {/* Creates multiple links (to PostView.js component) with the post id in the url to identify each post*/}
                            <Link key={post.id} to={`/PostView/${post.id}`} className = 'profile-post-links'><h1>Title: {post.title}</h1></Link>
                            {/* <PostView author={curUser}/> */}
                            <p>Content: <div dangerouslySetInnerHTML={{ __html: post.body}}></div></p>
                        </div>
                    ))
                }
        </div>
    )

}


export default ProfilePosts

