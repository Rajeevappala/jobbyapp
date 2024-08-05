import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="bg-container">
        <Header />
        <div className="home-text-container">
          <h1>
            Find The Job That <br />
            Fits Your Life
          </h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary,
            <br /> information, company reviews. Find the job that fits your
            <br />
            abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="logout-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
