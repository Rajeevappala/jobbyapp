import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', errorStatus: false}

  getInputUsernameElement = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordElement = event => {
    this.setState({password: event.target.value})
  }

  onSuccessOfRequest = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureOfRequest = error => {
    this.setState({errorMsg: error, errorStatus: true})
  }

  submitFormContainer = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessOfRequest(data.jwt_token)
    } else {
      this.onFailureOfRequest(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, errorStatus} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="card-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="login-logo"
              alt="website logo"
            />
            <form
              className="form-container"
              onSubmit={this.submitFormContainer}
            >
              <label htmlFor="input" className="label-ele">
                USERNAME
              </label>
              <input
                type="text"
                id="input"
                className="input-element"
                placeholder="Username"
                value={username}
                onChange={this.getInputUsernameElement}
              />
              <label htmlFor="password" className="label-ele">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input-element"
                placeholder="Password"
                value={password}
                onChange={this.onChangePasswordElement}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {errorStatus && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
