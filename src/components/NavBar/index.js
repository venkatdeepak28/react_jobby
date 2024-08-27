import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const NavBar = props => {
  const logOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="nav-bar">
      <li>
        <div className="logo-container">
          <Link to="/">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
      </li>
      <li>
        <div className="text-container">
          <Link to="/">
            <p className="text-para">Home</p>
          </Link>
          <Link to="/jobs">
            <p className="text-para">Jobs</p>
          </Link>
        </div>
      </li>
      <li>
        <div className="text-container">
          <button className="custom-btn" type="submit" onClick={logOut}>
            Logout
          </button>
        </div>
      </li>
    </ul>
  )
}

export default withRouter(NavBar)
