import React from 'react'
import { useState, useMemo } from "react"
import { Alert, FormRow, FormRowSelect } from "../Components/"
import Wrapper from "../assets/Wrappers/SearchContainer"
import { useAppContext } from "../Context/AppContext"


const SearchContainer = () => {
  // local state to set form input
  const [localSearch, setLocalSearch] = useState("")

  // get state from contexts
  const { searchJob, searchJobStatus, searchJobType, searchJobSortBy, searchJobSortByOptions, showAlert, clearFilters,
    jobTypeOptions, statusOptions, isLoading, handleChangeGlobal } = useAppContext()

  // handle search
  const handleSearch = (e) => {
    console.log("handleSearch: ", e.target.value)
    if (isLoading) return
    // pass an object to handleChangeGlobal to update state
    handleChangeGlobal({ name: e.target.name, value: e.target.value })
  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    // clear local state, clear global state using dispatch 
    setLocalSearch("")
    clearFilters()
  }

  // debounce method to delay search input
  const debounce = () => {
    let timeoutID;
    return (
      (e) => {
        setLocalSearch(e.target.value)
        clearTimeout(timeoutID) // clear current timeout id
        timeoutID = setTimeout(() => { // returns timeout id
          console.log("debounce: ", timeoutID)
          // pass object with input name, value to global fn
          handleChangeGlobal({name: e.target.name,  value: e.target.value})
        }, 2000)
      }
    )
  }

  // don't re-render this component when run
  const optimisedDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>
      <h3>All jobs</h3>
      <form className="form">
        <h5>Search Form</h5>
        { /* show the alert component with the state */}
        { showAlert && <Alert /> }
        <div className="form-center">
          {/* update search field to localSearch only */}
          <FormRow type="text" name="searchJob" value={localSearch} handleChange={optimisedDebounce}></FormRow>
          <FormRowSelect type="text" name="searchJobStatus" labelText="Status" value={searchJobStatus} list={["all", ...statusOptions]} handleChange={handleSearch}></FormRowSelect>
          <FormRowSelect type="select" name="searchJobType" labelText="Type" value={searchJobType} list={["all", ...jobTypeOptions]} handleChange={handleSearch}></FormRowSelect>
          <FormRowSelect type="select" name="searchJobSortBy" labelText="Sort By" value={searchJobSortBy} list={searchJobSortByOptions} handleChange={handleSearch}></FormRowSelect>
          <button type="submit" className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer