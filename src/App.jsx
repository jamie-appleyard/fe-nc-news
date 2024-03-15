import { useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { getTopics, getUser, getUsers } from './utils'
import NavBar from './components/NavBar'
import ArticlesList from './components/ArticlesList'
import ArticleDetail from './components/ArticleDetail'
import { useSearchParams } from "react-router-dom"

function App() {
  const [user, setUser] = useState({}) //wants to be a useEffect to retrieve a user object from API
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [topics, setTopics] = useState([{slug:'Home'}])
  const [users, setUsers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const topicQuery = searchParams.get('topic')

  const setTopic = (topic) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', topic)
    setSearchParams(newParams)
  }

  useEffect(() => {
    getTopics().then((resTopics) => {
      setTopics([...topics, ...resTopics])
    })
  }, [])

  useEffect(() => {
    getUser('grumpy19').then((user) => {
      setUser(user)
    })
  }, [])

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users)
    })
  }, [])

  return (
    <>
      <UserContext.Provider value={{user, isLoggedIn, users}}>
        <NavBar topics={topics} setTopic={setTopic} topicQuery={topicQuery}/>
        <Routes>
          <Route path='/' element={<ArticlesList topicQuery={topicQuery}/>}/>
          <Route path='/articles/:articleID' element={<ArticleDetail/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
