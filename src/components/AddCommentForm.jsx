import { postCommentByArticleID } from "../utils"
import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const AddCommentForm = (props) => {
    const { title, setDisplayCommentForm, articleID, setComments, setDisplayStatusMessage, setStatusMessage } = props
    const [commentBody, setCommentBody] = useState('')
    const { user } = useContext(UserContext)

    const handleBackButtonClick = () => {
        setDisplayCommentForm(false)
    }

    const handlePostButtonClick = (e) => {
        e.preventDefault()

        const postCommentObj = {
            'username': user.username,
            'body': commentBody
        }

        setComments((currComments) => {
            const newComments = [...currComments]
            newComments.unshift(
                {
                    'comment_id' : 'tempkey',
                    'author': user.username,
                    'body': commentBody,
                    'votes': 0
                }
            )
            return newComments
        })

        setDisplayCommentForm(false)

        postCommentByArticleID(articleID, postCommentObj).then((comment) => {
            setStatusMessage('Comment Posted Succesfully')
            setDisplayStatusMessage(true)
            setComments((currComments) => {
                const newComments = currComments.map((currComment) => {
                    if (currComment.comment_id === 'tempkey') {
                        return comment
                    } else {
                        return currComment
                    }
                })
                return newComments
            })
        }).catch((err) => {
            setStatusMessage('Comment Failed To Post')
            setDisplayStatusMessage(true)
        })
    }

    return (
        <form>
            <div className="add-comment-form">
                <div className="add-comment-controls">
                    <img src="/src/assets/arrow-left-solid.svg" onClick={handleBackButtonClick}/>
                    <h3>Add Comment</h3>
                    <button type='submit' onClick={handlePostButtonClick}>Post</button>
                </div>
                <div className="add-comment-title-section">
                    <h4>{title}</h4>
                </div>
                <div className="add-comment-body">
                        <textarea type='text' placeholder='Your comment...' onChange={(e) => {setCommentBody(e.target.value)}} value={commentBody}/>
                </div>
            </div>
        </form>
    )
}

export default AddCommentForm