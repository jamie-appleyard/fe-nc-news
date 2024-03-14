import ProfileImage from "./ProfileImage"
import VoteCommentModule from "./VoteCommentModule"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { Link } from 'react-router-dom'

const ArticleCard = (props) => {
    const { users } = useContext(UserContext)
    const {article} = props
    const [author, setAuthor] = useState('')

    useEffect(() => {
        const matchingAuthor = users.filter((user) => user.username === article.author)[0]
        setAuthor(matchingAuthor)
    }, [])
    
    return (
        <div className="article-card">
            <Link className='router-link' to={`/articles/${article.article_id}`}>
                <div className="article-card-details-block">
                    <ProfileImage image_url={author ? author.avatar_url : '/src/assets/user-regular.svg'}/>
                    <p>{article.author} - {article.topic}</p>
                </div>
                <h3>{article.title}</h3>
                <img src={article.article_img_url}/>
            </Link>
                <VoteCommentModule voteTargetID={article.article_id} votes={article.votes} commentsOn={true} commentCount={article.comment_count}/>
        </div>
    )
}

export default ArticleCard