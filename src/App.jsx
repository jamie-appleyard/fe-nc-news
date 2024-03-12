import { useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { getTopics, getUser, getUsers } from './utils'
import NavBar from './components/NavBar'
import ArticlesList from './components/ArticlesList'
import ArticleDetail from './components/ArticleDetail'

function App() {
  const [user, setUser] = useState({}) //wants to be a useEffect to retrieve a user object from API
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics)
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
        <NavBar topics={topics} setSelectedTopic={setSelectedTopic}/>
        <Routes>
          <Route path='/' element={<ArticlesList/>}/>
          <Route path='/articles/:articleID' element={<ArticleDetail/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
