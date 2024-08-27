const Profile = props => {
  const {profileArr} = props

  return (
    <div className="profile-bg-container">
      <img
        className="profile-logo"
        src={profileArr.profile_image_url}
        alt="profile"
      />
      <h1 className="profile-heading">{profileArr.name}</h1>
      <p className="profile-para">{profileArr.short_bio}</p>
    </div>
  )
}

export default Profile
