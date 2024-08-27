import {Link} from 'react-router-dom'
import {Component} from 'react'

import NavBar from '../NavBar'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="body-container">
          <div className="home-container">
            <h1 className="main-heading">Find The Job That Fits Your Life</h1>
            <p className="text-para">
              Millions of people are searching for jobs, consectetuer adipiscing
              elit. Non conubia nostra praesent nam lobortis. Ornare primis enim
              dolor primis ac laoreet gravida. Rutrum ultrices montes eu; odio
              duis mauris libero. Vel quisque cras a felis egestas euismod,
              rutrum hendrerit! Dignissim ac finibus aliquet convallis semper
              primis turpis, cras nisl.
            </p>
            <Link to="/jobs">
              <button
                className="custom-btn extra"
                type="button"
                onClick={this.getJobs}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Home
