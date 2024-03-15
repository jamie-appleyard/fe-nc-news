import { useEffect, useState } from "react"
import { getArticles } from "../utils"
import ArticleCard from "./ArticleCard"

const ArticlesList = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const { topicQuery } = props

    useEffect(() => {
        setLoading(true)
        getArticles(topicQuery).then((articles) => {
            setArticles(articles)
            setLoading(false)
        })
    }, [topicQuery])

    if (loading) {
         return (
            <div className='articles-list'>
                <h3>Loading ...</h3>
            </div>
         )
    } else {
        return (
            <div className='articles-list'>
                {articles.map((article) => {
                    return <ArticleCard article={article} key={article.title}/>
                })}
            </div>
        )
    }
}

export default ArticlesList