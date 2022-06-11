import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import Wrapper from "../assets/Wrappers/Job"
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa"
import { useAppContext } from "../Context/AppContext" // global state
import JobInfo from "./JobInfo"

const Job = ({_id, company, position, jobLocation, status, jobType, createdAt}) => { // destructure props
	// format date using moment
	const date = moment(createdAt).format("MMM Do YY")
	// get state functions
	const { setEditJob, deleteJob } = useAppContext()
  
  return (   
    <Wrapper>
      <header>
         	<div className="main-icon">{company.charAt(0)}</div> {/* get 1st char of string */}
			<div className="info">
				<h5>{position}</h5>
				<p>{company}</p>
          </div>
      </header>
	  <div className="content">
		  <div className="content-center">
			  {/* pass icons to component */}
			  <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
			  <JobInfo icon={<FaCalendarAlt />} text={date} />
			  <JobInfo icon={<FaBriefcase />} text={jobType} />
			  <div className={`status ${status}`}>{status}</div>
		  </div>
		  <footer>
			  <div className="actions">
				<Link to="/add-job" className="btn edit-btn" onClick={() => setEditJob(_id)}>Edit</Link> {/* pass id to edit */}
				<button className="btn delete-btn" onClick={() => deleteJob(_id)}>Delete</button>
			  </div>
		  </footer>
	  </div>
    </Wrapper>
  )
}

export default Job