import Header from '../Header'
import './index.css'

const NotFound = props => {
  const renderHomeElement = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div>
      <Header />
      <div className="notFound-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="not-found"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found.</p>
        <button
          type="button"
          className="retry-button"
          onClick={renderHomeElement}
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default NotFound
