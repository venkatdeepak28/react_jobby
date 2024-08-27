import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import NavBar from '../NavBar'
import SkillCard from '../SkillCard'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetailsPage extends Component {
  state = {
    similarJobsArr: [],
    filteredJobArr: [],
    lifeAtComp: [],
    skillArr: [],
    isLoading: true,
    apiStatus: apiConstant.initial,
  }

  componentDidMount() {
    this.jobDetailArr()
  }

  jobDetailArr = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobdetailUrl = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    const response = await fetch(jobdetailUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const similarJobsArr = data.similar_jobs.map(eachValue => ({
        companyLogoUrl: eachValue.company_logo_url,
        employmentType: eachValue.employment_type,
        id: eachValue.id,
        jobDescription: eachValue.job_description,
        location: eachValue.location,
        rating: eachValue.rating,
        title: eachValue.title,
      }))
      const filteredJobArr = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        title: data.job_details.title,
        packagePerAnnum: data.job_details.package_per_annum,
      }
      const lifeAtComp = data.job_details.life_at_company
      const skillArr = data.job_details.skills
      this.setState({
        similarJobsArr,
        filteredJobArr,
        lifeAtComp,
        skillArr,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false, apiStatus: apiConstant.failure})
    }
  }

  render() {
    const {similarJobsArr, filteredJobArr, lifeAtComp, skillArr} = this.state
    const {isLoading, apiStatus} = this.state

    if (isLoading === true) {
      return (
        <>
          <NavBar />
          <div className="success-container">
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          </div>
        </>
      )
    }

    if (apiStatus === apiConstant.failure) {
      return (
        <>
          <NavBar />
          <div className="success-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt=" failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button
              type="button"
              className="custom-btn"
              onClick={this.jobDetailArr}
            >
              Retry
            </button>
          </div>
        </>
      )
    }

    return (
      <>
        <NavBar />
        <div className="success-container">
          <div className="job-details-container">
            <div className="container">
              <div>
                <img
                  className="job-logo"
                  src={filteredJobArr.companyLogoUrl}
                  alt="job details company logo"
                />
              </div>
              <div className="star-container">
                <h1 className="job-title">{filteredJobArr.title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star" />
                  <p className="rating">{filteredJobArr.rating}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="location-container">
                <div className="container">
                  <div className="rating-container">
                    <HiLocationMarker className="star" />
                    <p className="para">{filteredJobArr.location}</p>
                  </div>
                  <div className="rating-container">
                    <BsFillBriefcaseFill className="star" />
                    <p className="para">{filteredJobArr.employmentType}</p>
                  </div>
                </div>
                <p className="price">{filteredJobArr.packagePerAnnum}</p>
              </div>
              <hr className="hr-el" />
            </div>
            <div className="desc-container">
              <div className="btn-container">
                <h1 className="desc-heading">Description</h1>
                <div className="btn-container">
                  <a
                    className="visit-btn"
                    href={filteredJobArr.companyWebsiteUrl}
                  >
                    Visit
                    <BiLinkExternal className="star" />
                  </a>
                </div>
              </div>
              <p className="desc-para">{filteredJobArr.jobDescription}</p>
            </div>
            <h1 className="desc-heading">Skills</h1>
            <ul className="skill-list-prop">
              {skillArr.map(eachValue => (
                <SkillCard key={eachValue.name} eachValue={eachValue} />
              ))}
            </ul>
            <h1 className="desc-heading">Life at Company</h1>
            <div className="life-container">
              <p className="desc-para">{lifeAtComp.description}</p>
              <img className="life-logo" src={lifeAtComp.image_url} alt="" />
            </div>
          </div>
          <h1 className="similar-heading">Similar Jobs</h1>
          <ul className="similar-list-prop">
            {similarJobsArr.map(eachValue => (
              <SimilarJobCard key={eachValue.id} eachValue={eachValue} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default JobDetailsPage
