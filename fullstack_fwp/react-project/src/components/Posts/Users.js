import "./Users.css"
import React, {useState, useRef, useContext, useEffect } from "react";
import { getUsers, setUser } from "../../data/repository";
import { Link } from 'react-router-dom';
import { userContext } from '../Global_Pages/UserContext';


const Users = () => {


    const [users, setUsers] = useState([])
    const {user, setUser} = useContext(userContext)


    useEffect(() => {
        allUsers()
    }, [])

    async function allUsers() {
        let users = await getUsers()
        setUsers(users)
        console.log(users)
    }
    

return (

    <div className="user-display-container">

        {users.length > 0 ? (
            

                users.map((user) => (
                    <div className='posts-snippet'>

                        {/* Creates multiple links (to PostView.js component) with the post id in the url to identify each post*/}
                        <Link key={user.user_id} to={`/ProfilePosts/${user.user_id}`} className = 'profile-post-links'><h1>{user.username}'s profile</h1></Link>
                    </div>
                ))


            ):
                <div className='no-posts-to-show'><h1>No users :)</h1></div>
            }
    


    </div>

)


}

export default Users
