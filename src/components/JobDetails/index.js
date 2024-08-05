import './index.css'
import {Link} from 'react-router-dom'
import {FaStar, FaLocationArrow, FaShoppingBag} from 'react-icons/fa'

const JobDetails = props => {
  const {jobDetails} = props
  const {
    companyLogo,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    packageAmount,
    id,
  } = jobDetails

  return (
    <div>
      <Link to={`/jobs/${id}`} className="link-element">
        <li className="list-items-details">
          <div className="list-container">
            <div className="logo-container">
              <div className="img-cont">
                <img
                  src={companyLogo}
                  alt="company logo"
                  className="company-logo"
                />
              </div>
              <div>
                <h1 className="employment-title">{title}</h1>
                <div className="logo-container-ele">
                  <FaStar className="star-icon" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="flex-cont">
              <div className="flex-ele">
                <div className="flex-ele">
                  <FaLocationArrow className="icon-star" />
                  <p>{location}</p>
                </div>
                <div className="flex-ele">
                  <FaShoppingBag className="icon-star" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <div>
                <div>
                  <p>{packageAmount}</p>
                </div>
              </div>
            </div>
            <hr className="line-ele" />
            <h1 className="desc-head">Description</h1>
            <p className="desc-para">{jobDescription}</p>
          </div>
        </li>
      </Link>
    </div>
  )
}

export default JobDetails
