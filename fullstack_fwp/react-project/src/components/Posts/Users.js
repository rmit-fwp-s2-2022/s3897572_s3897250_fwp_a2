import "./Users.css"
import React, {useState, useRef, useContext, useEffect } from "react";
import { getUsers, setUser } from "../../data/repository";
import { Link } from 'react-router-dom';
import { userContext } from '../Global_Pages/UserContext';
import { findUser, updateUser } from "../../data/repository";

const Users = () => {


    const [users, setUsers] = useState([])
    const [following, setFollowing] = useState([])
    const [followed, setFollowed] = useState(false)
    const {user, setUser} = useContext(userContext)
    const [curDelete, setCurDelete] = useState(false)
    const [isViewerUser, setViewerUser] = useState(null)


    useEffect(() => {

        allUsers()

    }, [followed])

    async function allUsers() {

        // Loads in all users

        let users = await getUsers()
        setUsers(users)

    }


    
    async function follow(event) {

        // Adds the current user to the following list
        // of the post's author in the form of a JSON object.



        let user_id = event.target.value
        let curUser = await findUser(user_id)

        let followerList = JSON.parse(curUser.followers)
        followerList.push(user.username)
        curUser.followers = JSON.stringify(followerList)
        
        await updateUser(curUser)
        setFollowed(true)
        

    }

    
    async function unfollow(event) {


        let user_id = event.target.value

        let curUser = await findUser(user_id)
        let followerList = JSON.parse(curUser.followers)

        let indexRemoval = followerList.indexOf(user.username)
        followerList.splice(indexRemoval, 1)
        curUser.followers = JSON.stringify(followerList)
        
        let newCurUser = await updateUser(curUser)

        setFollowed(false)

    }


    // Conditional to check if current user
    // is in the followers of the users being mapped.


return (

    <div>

        {users.length > 0 ? (
            
                users.map((Muser) => (

                    <div className='posts-snippet'>

                        { Muser.followers.includes(user.username) ? (
                            // If logged in user is inside followers list current mapped user

                            <div><Link key={Muser.user_id} to={`/ProfilePosts/${Muser.user_id}`} className = 'profile-post-links'><h1>{Muser.username}'s profile</h1></Link></div>
                            
                        ) :

                            // If logged in user is not a follower of current mapped user 
                        <div>
                            <h1>{Muser.username}</h1>
                            <button value={Muser.user_id} onClick={follow}>Follow</button>
                            <button value={Muser.user_id} onClick={unfollow}>Unfollow</button>
                        </div>

                        }
                        
                    </div>
                ))


            ):
                <div className='no-posts-to-show'><h1>No users :)</h1></div>
            }
    


    </div>

)


}

export default Users
