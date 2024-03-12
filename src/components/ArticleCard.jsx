import ProfileImage from "./ProfileImage"
import VoteCommentModule from "./VoteCommentModule"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

//how to get user profile pics
//article body is at the article detail endpoint so will need to pull that in for each article also

const ArticleCard = (props) => {
    const { users } = useContext(UserContext)
    const {article} = props
    return (
        <div className="article-card">
            <div className="article-card-details-block">
                <ProfileImage image_url={users ? users.filter((user) => user.username === article.author)[0].avatar_url : null}/>
                <p>{article.author} - {article.topic}</p>
            </div>
            <h3>{article.title}</h3>
            <img src={article.article_img_url}/>
            <VoteCommentModule votes={article.votes} commentsOn={true} commentCount={article.comment_count}/>
        </div>
    )
}

export default ArticleCard