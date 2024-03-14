import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getArticleByID } from "../utils"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import ProfileImage from "./ProfileImage"
import Comments from "./Comments"
import VoteCommentModule from "./VoteCommentModule"
import BackButton from "./BackButton"
import AddCommentForm from "./AddCommentForm"
import StatusMessage from "./StatusMessage"
import { Link } from "react-router-dom"

const ArticleDetail = () => {
    const { articleID } = useParams()
    const [article, setArticle] = useState({})
    const [author, setAuthor] = useState('')
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [displayCommentForm, setDisplayCommentForm] = useState(false)
    const [displayStatusMessage, setDisplayStatusMessage] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')
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
                { displayCommentForm ? <AddCommentForm title={article.title} setDisplayCommentForm={setDisplayCommentForm} articleID={articleID} setComments={setComments} setDisplayStatusMessage={setDisplayStatusMessage} setStatusMessage={setStatusMessage}/> : null}
                { displayStatusMessage ? <StatusMessage message={statusMessage} setDisplayStatusMessage={setDisplayStatusMessage}/> : null}
                <div className="article-detail" style={ displayCommentForm ? {display:'none'} : {display:"block"} }>
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
                <Comments articleID={articleID} articleTitle={article.title} setDisplayCommentForm={setDisplayCommentForm} comments={comments} setComments={setComments}/>
            </>
        )
    }
}

export default ArticleDetail