import ProfileImage from "./ProfileImage"
import VoteCommentModule from "./VoteCommentModule"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { deleteCommentByID } from "../utils"

const Comment = (props) => {
    const [displayDeleteButton, setDisplayDeleteButton] = useState(false)
    const {comment, comments, setComments, setDisplayStatusMessage, setStatusMessage} = props
    const { user } = useContext(UserContext)

    const handleDeleteButtonCLick = (commentID) => {
        setComments((currComments) => {
            const newComments = [...currComments]
            return newComments.filter((comment) => {return comment.comment_id !== commentID})
        })
        deleteCommentByID(commentID).then((status) => {
            setStatusMessage('Comment Succesfully Deleted')
            setDisplayStatusMessage(true)
        }).catch((err) => {
            setStatusMessage('Failed to Delete Comment')
            setDisplayStatusMessage(true)
        })
    }

    return (
        <div className="comment">
            <div className="article-card-details-block">
                <ProfileImage image_url='/src/assets/user-regular.svg'/>
                <p>{comment.author}</p>
                { comment.author === user.username ? <img className='comments-menu' src='/src/assets/ellipsis-vertical-solid.svg' onClick={() => {setDisplayDeleteButton(currValue => !currValue)}}/> : null}
                <button className='comment-delete-button' style={ displayDeleteButton ? {display:'block'} : {display:'none'}} onClick={() => {handleDeleteButtonCLick(comment.comment_id)}}>Delete</button>
            </div>
            <p className='comment-body'>{comment.body}</p>
            <VoteCommentModule votes={comment.votes} commentsOn={false}/>
        </div>
    )
}

export default Comment