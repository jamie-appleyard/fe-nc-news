import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import ProfileImage from "./ProfileImage"
import { useLocation, useNavigate } from "react-router-dom"

const NavBar = (props) => {
    const { topics, setTopic, topicQuery } = props
    const { user } = useContext(UserContext)
    const [topicDropdownToggle, setTopicDrownDownToggle] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()

    const handleTopicOptionClick = (topic) => {
        if (location.pathname !== '/') {
            navigate(`/?topic=${topic}`)
            setTopicDrownDownToggle(!topicDropdownToggle)
        } else {
            setTopic(topic)
            setTopicDrownDownToggle(!topicDropdownToggle)
        } 
    }

    return (
        <nav>
            <img src='/src/assets/bars-solid.svg'/>
            {topicDropdownToggle ? (
                <div className="topic-dropdown-closed" onClick={() => {setTopicDrownDownToggle(!topicDropdownToggle)}}>
                    <p>{ topicQuery ? topicQuery : 'Home'}</p>
                    <img src='/src/assets/angle-down-solid.svg'/>
                </div>
            ) : (
                <div className="topic-dropdown-expanded">
                    {topics.map((topic) => {
                        return (
                            <div key={topic.slug} className="topic-dropdown-expanded-option" onClick={() => {handleTopicOptionClick(topic.slug)}}>
                                <p>{topic.slug}</p>
                                {topic.slug === topicQuery ? <img src='/src/assets/check-solid.svg'/> : null}
                            </div>
                        )
                    })}
                </div>
            )}
            <ProfileImage image_url={user.avatar_url}/>
        </nav>
    )
}

{/* <form>
    <select>
        <option key='home' value='Home'>Home</option>
        { topics.map((topic) => {
            return <option key={topic.slug} values={topic.slug}>{topic.slug}</option>
        })}
    </select>
</form> */}

export default NavBar