import React, { useState, useContext } from "react";
import { userContext } from '../Global_Pages/UserContext';
import { getComments, createComment} from "../../data/repository";
import "./Comment.css"


function Comment(props) {


    const {user, setUser} = useContext(userContext)
    const [replying, setReplying] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [content, setContent] = useState(props.content)      // Reply
    const [comments, setComments] = useState([])

    function replytextinput(event) {
        setReplyText(event.target.value)
    }


    async function submitReply() {


        const commentObj = {
            comment_body: replyText,
            comment_id: Date.now(),
            user: user.username,    // The author, set to anyone currently logged in
            reply_id: props.content.reply_id

        }

        console.log(commentObj)

        if (replyText.length > 0) {
            
            // Add comment in database
            let newComment = await createComment(commentObj)

            // Reload the comments, with the newly created comment
            let comments = await getComments(props.content)     // Content is the reply from props
            setComments(comments)


            setReplyText("")
            setReplying(false)

       } 
       else{
        window.alert("Replies cannot be empty!")
       }
    
    }


  return (
    <div>

        <p><div dangerouslySetInnerHTML={{ __html: props.content.reply_body}}/></p>

        <br></br>
        <button className="add-reply-button" onClick={() => setReplying(true)}>Add reply</button>

        {replying ? (

                // Show input for reply to the reply

            <div>
                <input className="submit-reply-input" placeholder="Enter reply" onChange={replytextinput}></input>
                <button className="add-submit-button" onClick={submitReply}>Submit</button>
            </div>

        ) :

                // Else, show view of all replies for given reply (from props.content)

            <div>
                
                {comments.length > 0 ? (
                    <div className="nested-comments">
                        {comments.map((comment) => (
                            
                            <div className="comment" key={comment.comment_id}>
                                <hr width = {450}></hr>
                                <div className="image-text">
                                <small><b>{comment.user} {user.first_name} {user.last_name}</b></small>
                                </div>
                                <div className="comment-text-replies">
                                <p>{comment.comment_body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) :
                    ''
                }

            </div>
        }
        
    </div>
  )
}

export default Comment