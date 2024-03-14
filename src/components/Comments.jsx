import { getCommentsByArticleID } from "../utils"
import { useContext, useEffect, useState } from "react"
import Comment from "./Comment"

const Comments = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const { articleID, setDisplayCommentForm, comments, setComments, setDisplayStatusMessage, setStatusMessage } = props

    useEffect(() => {
        getCommentsByArticleID(articleID).then((comments) => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [])

    const handleAddCommentClick = () => {
        setDisplayCommentForm(true)
    }

    if (isLoading) {
        return (<div className="comments">
            <h3>Loading...</h3>
        </div>)
    } else {
        if (comments.length === 0 ) {
            return (
                <>
                    <div className="comments">
                        <p className='comment'>No comments yet ...</p>
                    </div>
                    <div className="add-comment-overlay">
                        <div className="add-comment-text-box" onClick={handleAddCommentClick}>
                            <p>Add comment ...</p>
                            <img src="/src/assets/arrow-right-solid.svg"/>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="comments">
                        {comments.map((comment) => {
                            return <Comment key={comment.comment_id} comment={comment} comments={comments} setComments={setComments} setDisplayStatusMessage={setDisplayStatusMessage} setStatusMessage={setStatusMessage}/>
                        })}
                    </div>
                    <div className="add-comment-overlay">
                        <div className="add-comment-text-box" onClick={handleAddCommentClick}>
                            <p>Add comment ...</p>
                            <img src="/src/assets/arrow-right-solid.svg"/>
                        </div>
                    </div>
                </> 
            )
        }
    }
}

export default Comments