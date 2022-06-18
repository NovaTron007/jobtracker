import React, { useEffect } from 'react'
import Loading from "./Loading"
import Job  from "./Job"
import Wrapper from "../assets/Wrappers/JobsContainer"
import { useAppContext } from '../Context/AppContext'

const JobContainer = () => {
    // get state 
    const { getJobs, jobs, totalJobs, isLoading, page, totalPages, 
            searchJob, searchJobStatus, searchJobType, searchJobSortBy, searchJobSortByOptions } = useAppContext()

    // get jobs on mount
    useEffect(() => {
        getJobs()
        // re-render if search form filters are updated
    }, [searchJob, searchJobStatus, searchJobType, searchJobSortBy, searchJobSortByOptions])


    if(isLoading) {
        return <Loading center />
    }
    if(jobs.length === 0) {
        return <h3>No jobs!</h3>
    }

    return (
        <Wrapper>
            <h5>{totalJobs} job{jobs.length > 0 && "s"} found</h5>
            
            <div className="jobs">
                {/* map jobs to component */}
                {jobs.map((item) => {
                    return(
                        <Job key={item._id} {...item} />  // spread whole item instead of using a prop
                    )
                })}
            </div>

        </Wrapper>
    )
}

export default JobContainer