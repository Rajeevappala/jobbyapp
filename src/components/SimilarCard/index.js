import {FaStar, FaLocationArrow, FaBriefcase} from 'react-icons/fa'
import './index.css'

const SimilarCard = props => {
  const {eachSimCard} = props
  const {
    companyLogo,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimCard

  return (
    <div className="sim-cards-cont">
      <li className="similar-card">
        <div className="flex-container-ele">
          <div>
            <img
              src={companyLogo}
              alt="similar job company logo"
              className="company-logo"
            />
          </div>
          <div className="flex-container-col">
            <div className="flex-container">
              <h1 className="heading">{title}</h1>
            </div>
            <div className="flex-container">
              <FaStar className="start-logo" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="heading">Description</h1>
          <p className="paragraph">{jobDescription}</p>
        </div>
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
      </li>
    </div>
  )
}

export default SimilarCard
