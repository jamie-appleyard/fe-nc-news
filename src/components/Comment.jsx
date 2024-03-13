import ProfileImage from "./ProfileImage"
import VoteCommentModule from "./VoteCommentModule"

const Comment = (props) => {
    const {comment} = props
    return (
        <div className="comment">
            <div className="article-card-details-block">
                <ProfileImage image_url='/src/assets/user-regular.svg'/>
                <p>{comment.author}</p>
            </div>
            <p className='comment-body'>{comment.body}</p>
            <VoteCommentModule votes={comment.votes} commentsOn={false}/>
        </div>
    )
}

export default Comment