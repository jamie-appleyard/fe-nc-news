const ProfileImage = (props) => {
    const {image_url} = props
    return (
        <div className='profile-image-frame'>
                <img className='profile-image' src={image_url}></img>
        </div>
    )
}

export default ProfileImage