import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Login extends Component {
  state = {
    username: '',
    password: '',
    errValue: '',
    loggedIn: apiConstants.initial,
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = value => {
    this.setState({loggedIn: apiConstants.failure, errValue: value})
  }

  changeName = event => {
    this.setState({username: event.target.value})
  }

  changePass = event => {
    this.setState({password: event.target.value})
  }

  checkUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userPass = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userPass),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errValue, loggedIn} = this.state

    console.log(loggedIn)

    return (
      <div className="bg-login-container">
        <div className="login-container">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-logo"
          />
          <form onSubmit={this.checkUser}>
            <div className="input-container">
              <label className="para" htmlFor="username">
                USERNAME
              </label>
              <input
                className="input-el"
                type="text"
                value={username}
                placeholder="Username"
                onChange={this.changeName}
                id="username"
              />
            </div>
            <div className="input-container">
              <label className="para" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input-el"
                type="password"
                value={password}
                placeholder="Password"
                id="password"
                onChange={this.changePass}
              />
            </div>
            <button className="login-custom-btn" type="submit">
              Login
            </button>
            {loggedIn === apiConstants.failure && (
              <p className="err-para">*{errValue}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
