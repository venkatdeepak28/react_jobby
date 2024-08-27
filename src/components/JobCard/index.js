import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {eachValue} = props

  const {id} = eachValue

  return (
    <Link to={`/jobs/${id}`} className="link-el">
      <li className="show-list-el">
        <div className="job-title-container">
          <div className="container">
            <img
              className="job-logo"
              src={eachValue.companyLogoUrl}
              alt={eachValue.title}
            />
            <div>
              <h1 className="job-title">{eachValue.title}</h1>
              <div className="rating-container">
                <AiFillStar className="star" />
                <h1 className="rating">{eachValue.rating}</h1>
              </div>
            </div>
          </div>
          <div>
            <div className="location-job-container">
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
              <h1 className="job-price">{eachValue.packagePerAnnum}</h1>
            </div>
            <hr className="hr-el" />
          </div>
          <div>
            <h1 className="desc-heading">Description</h1>
            <p className="desc-para">{eachValue.jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
