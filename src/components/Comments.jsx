import { getCommentsByArticleID } from "../utils"
import { useContext, useEffect, useState } from "react"
import Comment from "./Comment"

const Comments = (props) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { articleID } = props
    useEffect(() => {
        getCommentsByArticleID(articleID).then((comments) => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [])
    if (isLoading) {
        return (<div className="comments">
            <h3>Loading...</h3>
        </div>)
    }
    return (
        <div className="comments">
            {comments.map((comment) => {
                return <Comment key={comment.comment_id} comment={comment}/>
            })}
        </div>
    )
}

export default Comments