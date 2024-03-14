import { patchArticleVotesByArticleID } from "../utils"
import { useState } from "react"

const VoteCommentModule = (props) => {
    const {votes, commentsOn, commentCount, voteTargetID} = props
    const [renderedVotes, setRenderedVotes] = useState(votes)

    const handleVoteClick = (vote_inc) => {
        const voteObj = {
            'inc_votes': vote_inc
        }
        patchArticleVotesByArticleID(voteTargetID, voteObj).then((article) => {
            setRenderedVotes((currVotes) => {
                return currVotes + vote_inc;
            })
        })
    }

    return (
        <div className="vote-module">
            <img onClick={() => {handleVoteClick(1)}} src={`/src/assets/thumbs-up-regular.svg`}/>
            <img onClick={() => {handleVoteClick(-1)}} src={`/src/assets/thumbs-down-regular.svg`}/>
            <p>{renderedVotes}</p>
            { commentsOn ? 
                (<div className="comments-button">
                    <img src={`/src/assets/comment-regular.svg`}/>
                    <p>Comments {commentCount}</p>
                </div>) : null
            }
        </div>
    )
} 

export default VoteCommentModule