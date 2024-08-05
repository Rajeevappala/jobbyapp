import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaLocationArrow, FaBriefcase} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import SimilarCard from '../SimilarCard'
import SkillsContainer from '../SkillsContainer'
import Header from '../Header'

import './index.css'

const ApiJobCardStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobCard extends Component {
  state = {
    jobCardList: [],
    simileardata: [],
    apiStatus: ApiJobCardStatus.initial,
  }

  componentDidMount() {
    this.renderJobCard()
  }

  getSimilarJobsList = job => ({
    companyLogo: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    id: job.id,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  renderJobCard = async () => {
    const jwtEle = Cookies.get('jwt_token')
    this.setState({apiStatus: ApiJobCardStatus.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const options = {
      headers: {
        Authorization: `Bearer ${jwtEle}`,
      },
      method: 'GET',
    }

    const responseElement = await fetch(
      `https://apis.ccbp.in/jobs/${id}`,
      options,
    )
    const dataList = await responseElement.json()
    if (responseElement.ok) {
      console.log(dataList)

      const updatedDataList = {
        JobDetails: {
          companyLogoUrl: dataList.job_details.company_logo_url,
          companyWebsiteUrl: dataList.job_details.company_website_url,
          employmentType: dataList.job_details.employment_type,
          jobDescription: dataList.job_details.job_description,
          id: dataList.job_details.id,
          lifeAtCompany: {
            description: dataList.job_details.life_at_company.description,
            imageUrl: dataList.job_details.life_at_company.image_url,
          },
          location: dataList.job_details.location,
          rating: dataList.job_details.rating,
          packagePerAnnum: dataList.job_details.package_per_annum,
          title: dataList.job_details.title,
          skills: dataList.job_details.skills.map(eachSkills => ({
            name: eachSkills.name,
            imageUrlEle: eachSkills.image_url,
          })),
        },
      }

      const updatedSimilarData = dataList.similar_jobs.map(eachSimilarity =>
        this.getSimilarJobsList(eachSimilarity),
      )
      this.setState({
        jobCardList: updatedDataList.JobDetails,
        simileardata: updatedSimilarData,
        apiStatus: ApiJobCardStatus.success,
      })
    } else {
      this.setState({apiStatus: ApiJobCardStatus.failure})
    }
  }

  renderCardContainer = () => {
    const {jobCardList} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      packagePerAnnum,
      title,
      lifeAtCompany,
      skills,
    } = jobCardList

    const {description, imageUrl} = lifeAtCompany

    return (
      <div>
        <div className="flex-container">
          <div>
            <img src={companyLogoUrl} alt="companyLogo" className="logo" />
          </div>
          <div>
            <h1 className="title">{title}</h1>
            <div className="flex-container">
              <FaStar className="start-logo" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="total-flex-cont">
          <div className="flex-container">
            <div className="flex-container">
              <FaLocationArrow className="start-logo color-ele" />
              <p>{location}</p>
            </div>
            <div className="flex-container">
              <FaBriefcase className="start-logo color-ele" />
              <p>{employmentType}</p>
            </div>
          </div>
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div className="total-flex-cont">
          <h1 className="title1">Description</h1>
          <a href={companyWebsiteUrl} target="/_blank" className="visit">
            Visit
          </a>
        </div>
        <p className="para1">{jobDescription}</p>
        <h1 className="title1">Skills</h1>

        <ul className="ul-skills">
          {skills.map(eachSkill => (
            <SkillsContainer
              skillsListDetails={eachSkill}
              key={eachSkill.name}
            />
          ))}
        </ul>
        <h1 className="title1">Life at Company</h1>
        <div className="life-at-company-cont">
          <div>
            <p>{description}</p>
          </div>
          <div>
            <img
              src={imageUrl}
              alt="life at company"
              className="company-life-img"
            />
          </div>
        </div>
      </div>
    )
  }

  getApiSuccessForm = () => {
    const {simileardata} = this.state

    return (
      <div>
        <Header />

        <div className="card-Container">
          <div className="card-element">{this.renderCardContainer()}</div>
          <h1 className="title1">Similar Jobs</h1>
          <ul className="sim-cards-cont">
            {simileardata.map(simData => (
              <SimilarCard eachSimCard={simData} key={simData.id} />
            ))}
          </ul>
        </div>
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
        onClick={this.renderJobCard}
      >
        Retry
      </button>
    </div>
  )

  loadingApiStatus = () => (
    <div>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case ApiJobCardStatus.success:
        return this.getApiSuccessForm()
      case ApiJobCardStatus.failure:
        return this.returnFailureView()
      case ApiJobCardStatus.loading:
        return this.loadingApiStatus()
      default:
        return null
    }
  }
}

export default JobCard
