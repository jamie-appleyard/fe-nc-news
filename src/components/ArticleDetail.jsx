import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getArticleByID } from "../utils"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import ProfileImage from "./ProfileImage"

const ArticleDetail = () => {
    const { articleID } = useParams()
    const [article, setArticle] = useState({})
    const [author, setAuthor] = useState('')
    const { users } = useContext(UserContext)

    useEffect(() => {
        getArticleByID(articleID).then((article) => {
            setArticle(article)
        })
    }, [])

    useEffect(() => {
        const matchingAuthor = users.filter((user) => user.username === article.author)[0]
        setAuthor(matchingAuthor)
    }, [users])

    return (
        <div className="article-detail">
            <div className="article-card-details-block">
                <ProfileImage image_url={author ? author.avatar_url : '/src/assets/user-regular.svg'}/>
                <p>{article.author} - {article.topic}</p>
            </div>
            <h2>{article.title}</h2>
            <img src={article.article_img_url}/>
            <p>{article.body}</p>
        </div>
    )
}

export default ArticleDetail