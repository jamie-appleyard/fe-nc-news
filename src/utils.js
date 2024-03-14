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

export const getCommentsByArticleID = (articleID) => {
    return NCNewsAPI.get(`/articles/${articleID}/comments`).then((response) => {
        return response.data.comments
    })
}

export const patchArticleVotesByArticleID = (articleID, incVoteObj) => {
    return NCNewsAPI.patch(`/articles/${articleID}`, incVoteObj).then((response) => {
        return response.data.article
    })
}

export const postCommentByArticleID = (articleID, commentObj) => {
    return NCNewsAPI.post(`/articles/${articleID}/comments`, commentObj).then((response) => {
        return response.data.comment
    })
}

export const deleteCommentByID = (commentID) => {
    return NCNewsAPI.delete(`/comments/${commentID}`).then((response) => {
        return response.status
    })
}