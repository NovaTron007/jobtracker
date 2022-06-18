import React from 'react'
import { FormRow, FormRowSelect } from "../Components/"
import Wrapper from "../assets/Wrappers/SearchContainer"
import { useAppContext } from "../Context/AppContext"


const SearchContainer = () => {
  // get state from contexts
  const {searchJob, searchJobStatus, searchJobType, searchJobSortBy, searchJobSortByOptions, clearFilters, 
         jobTypeOptions, statusOptions, isLoading, handleChangeGlobal } = useAppContext()

  // handle search
  const handleSearch = (e) => {
    console.log("handleSearch: ", e.target.value)
    if(isLoading) return
    // pass an object to handleChangeGlobal to update state
    handleChangeGlobal({name: e.target.name, value: e.target.value})
  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    // clear state using dispatch 
    clearFilters()
  }


  return (
    <Wrapper>
      <h3>All jobs</h3>
      <form className="form">
        <h5>Search Form</h5>
        <div className="form-center">
          <FormRow type="text" name="searchJob" value={searchJob} handleChange={handleSearch}></FormRow>
          <FormRowSelect type="text" name="searchJobStatus" labelText="Status" value={searchJobStatus} list={["all",...statusOptions]} handleChange={handleSearch}></FormRowSelect>
          <FormRowSelect type="select" name="searchJobType" labelText="Type" value={searchJobType} list={["all", ...jobTypeOptions]} handleChange={handleSearch}></FormRowSelect>
          <FormRowSelect type="select" name="searchJobSortBy" labelText="Sort By" value={searchJobSortBy} list={searchJobSortByOptions} handleChange={handleSearch}></FormRowSelect>
          <button type="submit" className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer