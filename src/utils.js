import axios from 'axios'

const NCNewsAPI = axios.create({
    baseURL: 'https://nc-news-ow7l.onrender.com/api'
})

export const getTopics = () => {
    return NCNewsAPI.get('/topics').then((response) => {
        return response.data.topics
    })
}

export const getUser = (username) => {
    return NCNewsAPI.get(`/users/${username}`).then((response) => {
        return response.data.user
    })
}

export const getArticles = () => {
    return NCNewsAPI.get('/articles').then((response) => {
        return response.data.articles
    })
}

export const getUsers = () => {
    return NCNewsAPI.get('/users').then((response) => {
        return response.data.users
    })
}
export const getArticleByID = (articleID) => {
    return NCNewsAPI.get(`/articles/${articleID}`).then((response) => {
        return response.data.article
    })
}