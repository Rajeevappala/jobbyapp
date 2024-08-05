import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import JobDetails from '../JobDetails'
import EmploymentType from '../EmploymentType'
import SalaryList from '../SalaryList'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const ApiJobsBoardStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobsListElement: [],
    apiStatusEle: ApiJobsBoardStatus.initial,
    searchInput: '',
    jobsSearchList: [],
    salaryAmount: 0,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getInputSearchElement = event => {
    this.setState({searchInput: event.target.value})
  }

  getJobDetails = async () => {
    const {jobsSearchList, salaryAmount, searchInput} = this.state
    const jwtTokenEle = Cookies.get('jwt_token')
    this.setState({jobsSearchList})
    const urlEle = `https://apis.ccbp.in/jobs?employment_type=${jobsSearchList.join()}&minimum_package=${salaryAmount}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtTokenEle}`,
      },
      method: 'GET',
    }

    const fetchResponse = await fetch(urlEle, options)

    if (fetchResponse.ok) {
      const dataElement = await fetchResponse.json()

      const updatedList = dataElement.jobs.map(eachData => ({
        companyLogo: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        rating: eachData.rating,
        title: eachData.title,
        packageAmount: eachData.package_per_annum,
      }))
      this.setState({
        jobsListElement: updatedList,
        apiStatusEle: ApiJobsBoardStatus.success,
      })
    } else {
      this.setState({apiStatusEle: ApiJobsBoardStatus.failure})
    }
  }

  renderSuccessJobsList = () => {
    const {jobsListElement} = this.state
    const lengthOfEle = jobsListElement.length > 1

    return lengthOfEle ? (
      <div>
        <ul>
          {jobsListElement.map(eachJobProfile => (
            <JobDetails jobDetails={eachJobProfile} key={eachJobProfile.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="noJobsCont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  returnFailureView = () => (
    <div className="fail-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-view-ele"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>

      <button
        type="button"
        className="logout-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatusEle} = this.state

    switch (apiStatusEle) {
      case ApiJobsBoardStatus.success:
        return this.renderSuccessJobsList()
      case ApiJobsBoardStatus.failure:
        return this.returnFailureView()
      case ApiJobsBoardStatus.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  renderCheckBoxId = type => {
    this.setState(
      prevState => ({
        jobsSearchList: [...prevState.jobsSearchList, type],
      }),
      this.getJobDetails,
    )
  }

  renderRadioEle = amountEle => {
    this.setState({salaryAmount: amountEle}, this.getJobDetails)
  }

  OnKeyDownEvent = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-element">
        <input
          type="search"
          placeholder="Search"
          className="search-element"
          value={searchInput}
          onChange={this.getInputSearchElement}
          onKeyDown={this.OnKeyDownEvent}
        />

        <button
          type="button"
          onClick={this.getJobDetails}
          data-testid="searchButton"
        >
          Search
        </button>
      </div>
    )
  }

  render() {
    const {salaryAmount} = this.state
    console.log(salaryAmount)

    return (
      <div className="jobs-container">
        <Header />
        <div className="total-container">
          <div className="container1">
            <Profile />
            <hr className="horizontal-line" />
            <div>
              <h1 className="typeOfHead">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachEmployment => (
                  <EmploymentType
                    employmentDetails={eachEmployment}
                    key={eachEmployment.employmentTypeId}
                    renderCheckBoxId={this.renderCheckBoxId}
                  />
                ))}
              </ul>
              <hr className="horizontal-line" />
              <ul>
                <h1 className="typeOfHead">Salary Range</h1>
                {salaryRangesList.map(eachSalary => (
                  <SalaryList
                    salaryDetails={eachSalary}
                    renderRadioEle={this.renderRadioEle}
                    key={eachSalary.salaryRangeId}
                    value={salaryAmount}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="container2">
            {this.renderSearchInput()}

            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
