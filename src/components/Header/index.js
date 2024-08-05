import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const redirectToLogin = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <div>
        <Link to="/" className="link-element">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </div>
      <div className="link-container">
        <ul className="ul-container-ele">
          <li className="list-element">
            <Link to="/" className="link-element">
              Home
            </Link>
          </li>
          <li className="list-element">
            <Link to="/jobs" className="link-element">
              Jobs
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <button
          type="button"
          className="logout-button"
          onClick={redirectToLogin}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
