import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import ProfileImage from "./ProfileImage"

//add functionality for updating selected topic
//add menu functionality 
const NavBar = (props) => {
    const { topics, setSelectedTopic } = props
    const { user } = useContext(UserContext)
    return (
        <nav>
            <p>Menu</p>
            <form>
                <select>
                    <option key='home' value='Home'>Home</option>
                    { topics.map((topic) => {
                        return <option key={topic.slug} values={topic.slug}>{topic.slug}</option>
                    })}
                </select>
            </form>
            <ProfileImage image_url={user.avatar_url}/>
        </nav>
    )
}

export default NavBar