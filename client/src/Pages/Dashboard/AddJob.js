import React from 'react'
import { useAppContext } from '../../Context/AppContext'
import Wrapper from "../../assets/Wrappers/DashboardFormPage"
import Alert from "../../Components/Alert"
import FormRow from "../../Components/FormRow"
import FormRowSelect from '../../Components/FormRowSelect'

const AddJob = () => {
  // get state
  const { displayAlert, showAlert, isEditing, position, 
        company, jobLocation, jobTypeOptions, jobType, statusOptions, status, 
        handleChangeGlobal, clearFormValues, createJob } = useAppContext()

  // local handleChange: update state in context
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    // context function
    handleChangeGlobal({name, value})
  }

  // submit
  const handleSubmit = (e) => {
	e.preventDefault()
	if(!position || !company || !jobLocation) {
		// context function will dispatch action and update state to showAlert
		displayAlert()
		return
	}
	// context function
	if(isEditing) {
		// edit job later
		return
	}
	createJob()
   }

    // clear form
    const clearForm = (e) => {
      e.preventDefault()
	  // context function
      clearFormValues()
    }
  


  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>

        {showAlert && <Alert />}

        <h3>{isEditing ? "Edit Job" : "Add job"}</h3>

        <div className="form-center">
          <FormRow type="text" name="position" labelText="Position" value={position} handleChange={handleChange} />
          <FormRow type="text" name="company" labelText="Company" value={company} handleChange={handleChange} />
          <FormRow type="text" name="jobLocation" labelText="Job Location" value={jobLocation} handleChange={handleChange} />
          {/* map jobType options for select component */}
          <FormRowSelect type="select" name="jobType" labelText="Job Type" list={jobTypeOptions} value={jobType} handleChange={handleChange} />
          <FormRowSelect type="select" name="status" labelText="Status" list={statusOptions} value={status} handleChange={handleChange} />
          <div className="btn-container">
            <button className="btn btn-block" type="submit">Submit</button>
            <button className="btn btn-block clear-btn" onClick={clearForm}>Clear</button>
          </div>
        </div>


      </form>
    </Wrapper>
  )
}

export default AddJob