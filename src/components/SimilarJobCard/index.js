import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobCard = props => {
  const {eachValue} = props

  return (
    <li className="similar-list-el">
      <div className="similar-container">
        <div>
          <img
            className="job-logo"
            src={eachValue.companyLogoUrl}
            alt="similar job company logo"
          />
        </div>
        <div className="star-container">
          <h1 className="job-title">{eachValue.title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="rating">{eachValue.rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-desc-container">
        <div className="btn-container">
          <h1 className="desc-heading">Description</h1>
        </div>
        <p className="desc-para">{eachValue.jobDescription}</p>
      </div>
      <div className="similar-location-container">
        <div className="container">
          <div className="rating-container">
            <HiLocationMarker className="star" />
            <p className="para">{eachValue.location}</p>
          </div>
          <div className="rating-container">
            <BsFillBriefcaseFill className="star" />
            <p className="para">{eachValue.employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
