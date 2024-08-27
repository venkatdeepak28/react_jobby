import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import NavBar from '../NavBar'
import Profile from '../Profile'
import EmploymentType from '../employmentType'
import SalaryList from '../salaryList'
import JobCard from '../JobCard'

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

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    searchValue: '',
    typeArr: [],
    salaryValue: 0,
    profileArr: undefined,
    jobsArr: undefined,
    isLoading: true,
    apiStatus: apiConstant.initial,
  }

  componentDidMount() {
    this.getProfileJob()
  }

  getProfileJob = async () => {
    const {searchValue, typeArr, salaryValue} = this.state
    let value = ''
    if (typeArr.length > 1) {
      value = typeArr.join(',')
    } else {
      const newArr = [...typeArr]
      value = newArr.splice(0, 1)
    }
    const profileArrUrl = 'https://apis.ccbp.in/profile'
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${value}&minimum_package=${salaryValue}&search=${searchValue}`
    console.log(jobsApiUrl)
    const token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    const responseProfile = await fetch(profileArrUrl, option)
    const responseJob = await fetch(jobsApiUrl, option)
    if (responseProfile.ok === true) {
      if (responseJob.ok === true) {
        const dataProf = await responseProfile.json()
        const dataJob = await responseJob.json()
        const updatedJobArr = dataJob.jobs.map(eachValue => ({
          id: eachValue.id,
          title: eachValue.title,
          companyLogoUrl: eachValue.company_logo_url,
          employmentType: eachValue.employment_type,
          jobDescription: eachValue.job_description,
          location: eachValue.location,
          packagePerAnnum: eachValue.package_per_annum,
          rating: eachValue.rating,
        }))
        this.setState({
          profileArr: dataProf.profile_details,
          jobsArr: updatedJobArr,
          isLoading: false,
        })
      }
    } else {
      this.setState({isLoading: false, apiStatus: apiConstant.failure})
    }
  }

  changeType = value => {
    const {typeArr} = this.state
    typeArr.push(value)
    console.log(typeArr)
    this.setState({typeArr}, this.getProfileJob)
  }

  changeSalary = salary => {
    this.setState({salaryValue: salary}, this.getProfileJob)
  }

  changeSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  render() {
    const {profileArr, jobsArr, isLoading, searchValue} = this.state
    const {apiStatus} = this.state

    if (isLoading === true) {
      return (
        <div className="jobs-bg-container">
          <div className="filter-container">
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
            <hr className="horizontal-el" />
            <div>
              <h1 className="filter-heading">Type of Employment</h1>
              <ul className="employ-list-prop">
                {employmentTypesList.map(eachValue => (
                  <EmploymentType
                    key={eachValue.employmentTypeId}
                    eachValue={eachValue}
                    changeType={this.changeType}
                  />
                ))}
              </ul>
            </div>
            <hr className="horizontal-el" />
            <div>
              <h1 className="filter-heading">Salary Range</h1>
              <ul className="employ-list-prop">
                {salaryRangesList.map(eachValue => (
                  <SalaryList
                    key={eachValue.salaryRangeId}
                    eachValue={eachValue}
                    changeSalary={this.changeSalary}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-container">
            <div className="search-container">
              <input
                className="jobs-input-el"
                type="search"
                placeholder="Search"
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                label
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="show-job-list-prop">
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            </ul>
          </div>
        </div>
      )
    }

    if (apiStatus === apiConstant.failure) {
      return (
        <>
          <NavBar />
          <div className="jobs-bg-container">
            <div className="filter-container">
              <button
                className="retry-btn"
                type="submit"
                onClick={this.getProfileJob}
              >
                Retry
              </button>
              <hr className="horizontal-el" />
              <div>
                <h1 className="filter-heading">Type of Employment</h1>
                <ul className="employ-list-prop">
                  {employmentTypesList.map(eachValue => (
                    <EmploymentType
                      key={eachValue.employmentTypeId}
                      eachValue={eachValue}
                      changeType={this.changeType}
                    />
                  ))}
                </ul>
              </div>
              <hr className="horizontal-el" />
              <div>
                <h1 className="filter-heading">Salary Range</h1>
                <ul className="employ-list-prop">
                  {salaryRangesList.map(eachValue => (
                    <SalaryList
                      key={eachValue.salaryRangeId}
                      eachValue={eachValue}
                      changeSalary={this.changeSalary}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="jobs-container">
              <div className="search-container">
                <input
                  className="jobs-input-el"
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={this.changeSearch}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  onClick={this.getProfileJob}
                  label
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <div className="no-jobs-container">
                <img
                  className="no-jobs-logo"
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                  alt="failure view"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>We cannot seem to find the page you are looking for.</p>
                <button
                  className="retry-btn"
                  type="submit"
                  onClick={this.getProfileJob}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </>
      )
    }

    if (jobsArr.length === 0) {
      return (
        <>
          <NavBar />
          <div className="jobs-bg-container">
            <div className="filter-container">
              <Profile profileArr={profileArr} />
              <hr className="horizontal-el" />
              <div>
                <h1 className="filter-heading">Type of Employment</h1>
                <ul className="employ-list-prop">
                  {employmentTypesList.map(eachValue => (
                    <EmploymentType
                      key={eachValue.employmentTypeId}
                      eachValue={eachValue}
                      changeType={this.changeType}
                    />
                  ))}
                </ul>
              </div>
              <hr className="horizontal-el" />
              <div>
                <h1 className="filter-heading">Salary Range</h1>
                <ul className="employ-list-prop">
                  {salaryRangesList.map(eachValue => (
                    <SalaryList
                      key={eachValue.salaryRangeId}
                      eachValue={eachValue}
                      changeSalary={this.changeSalary}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="jobs-container">
              <div className="search-container">
                <input
                  className="jobs-input-el"
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={this.changeSearch}
                />
                <button
                  data-testid="searchButton"
                  onClick={this.getProfileJob}
                  type="button"
                >
                  <BsSearch className="search-icon" />{' '}
                </button>
              </div>
              <div className="no-jobs-container">
                <img
                  className="no-jobs-logo"
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                />
                <h1>No Jobs Found</h1>
                <p>We Could not find any jobs. Try other filters.</p>
              </div>
            </div>
          </div>
        </>
      )
    }

    return (
      <>
        <NavBar />
        <div className="jobs-bg-container">
          <div className="filter-container">
            <Profile profileArr={profileArr} />
            <hr className="horizontal-el" />
            <div>
              <h1 className="filter-heading">Type of Employment</h1>
              <ul className="employ-list-prop">
                {employmentTypesList.map(eachValue => (
                  <EmploymentType
                    key={eachValue.employmentTypeId}
                    eachValue={eachValue}
                    changeType={this.changeType}
                  />
                ))}
              </ul>
            </div>
            <hr className="horizontal-el" />
            <div>
              <h1 className="filter-heading">Salary Range</h1>
              <ul className="employ-list-prop">
                {salaryRangesList.map(eachValue => (
                  <SalaryList
                    key={eachValue.salaryRangeId}
                    eachValue={eachValue}
                    changeSalary={this.changeSalary}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-container">
            <div className="search-container">
              <input
                className="jobs-input-el"
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={this.changeSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.getProfileJob}
                label
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="show-job-list-prop">
              {jobsArr.map(eachValue => (
                <JobCard key={eachValue.id} eachValue={eachValue} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
