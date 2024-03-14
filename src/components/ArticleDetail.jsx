import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getArticleByID } from "../utils"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import ProfileImage from "./ProfileImage"
import Comments from "./Comments"
import VoteCommentModule from "./VoteCommentModule"
import BackButton from "./BackButton"
import { Link } from "react-router-dom"

const ArticleDetail = () => {
    const { articleID } = useParams()
    const [article, setArticle] = useState({})
    const [author, setAuthor] = useState('')
    const [loading, setLoading] = useState(true)
    const { users } = useContext(UserContext)

    useEffect(() => {
        getArticleByID(articleID).then((article) => {
            setArticle(article)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        const matchingAuthor = users.filter((user) => user.username === article.author)[0]
        setAuthor(matchingAuthor)
    }, [users])

    if (loading) {
        return (
           <div className='articles-list'>
               <h3>Loading ...</h3>
           </div>
        )
   } else {
        return (
            <>
                <div className="article-detail">
                    <div className="sub-menu">
                        <Link to='/'>
                            <BackButton/>
                        </Link>
                    </div>
                    <div className="article-card-details-block">
                        <ProfileImage image_url={author ? author.avatar_url : '/src/assets/user-regular.svg'}/>
                        <p>{article.author} - {article.topic}</p>
                    </div>
                    <h2>{article.title}</h2>
                    <img className='article-detail-img' src={article.article_img_url}/>
                    <p>{article.body}</p>
                </div>
                <VoteCommentModule voteTargetID={article.article_id} votes={article.votes} commentsOn={false}/>
                <Comments articleID={articleID}/>
            </>
        )
   }
}

export default ArticleDetail