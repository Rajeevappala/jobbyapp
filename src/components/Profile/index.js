import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const ApiStatusResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {profileDetails: [], apiStatus: ApiStatusResponse.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtTokenEle = Cookies.get('jwt_token')
    this.setState({apiStatus: ApiStatusResponse.loading})
    const options = {
      headers: {
        Authorization: `Bearer ${jwtTokenEle}`,
      },
      method: 'GET',
    }
    const responseEle = await fetch('https://apis.ccbp.in/profile', options)
    const dataEle = await responseEle.json()

    if (responseEle.ok) {
      const profileData = {
        name: dataEle.profile_details.name,
        imageUrl: dataEle.profile_details.profile_image_url,
        shortBio: dataEle.profile_details.short_bio,
      }
      this.setState({
        profileDetails: profileData,
        apiStatus: ApiStatusResponse.success,
      })
    } else {
      this.setState({apiStatus: ApiStatusResponse.failure})
    }
  }

  profileViewSuccess = () => {
    const {profileDetails} = this.state
    const {name, imageUrl, shortBio} = profileDetails
    return (
      <div className="bg-container-ele">
        <div className="card-details">
          <img src={imageUrl} alt="profile_image_url" className="image-ele" />
          <h1 className="heading-element">{name}</h1>
          <p className="bio-para">{shortBio}</p>
        </div>
      </div>
    )
  }

  profileFailureView = () => (
    <div>
      <button type="button" className="button-element-retry">
        Retry
      </button>
    </div>
  )

  loadingViewElement = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case ApiStatusResponse.success:
        return this.profileViewSuccess()
      case ApiStatusResponse.failure:
        return this.profileFailureView()
      case ApiStatusResponse.loading:
        return this.loadingViewElement()
      default:
        return null
    }
  }
}

export default Profile
