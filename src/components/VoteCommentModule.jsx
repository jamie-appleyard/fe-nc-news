const VoteCommentModule = (props) => {
    const {votes, commentsOn, commentCount} = props
    return (
        <div className="vote-module">
            <img src='src/assets/thumbs-up-regular.svg'/>
            <img src='src/assets/thumbs-down-regular.svg'/>
            <p>{votes}</p>
            <div className="comments-button">
                <img src="src/assets/comment-regular.svg"/>
                <p>Comments {commentCount}</p>
            </div>
        </div>
    )
} 

export default VoteCommentModule