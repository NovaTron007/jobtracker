import React from 'react'
import { useAppContext } from '../../Context/AppContext'
import Wrapper from "../../assets/Wrappers/DashboardFormPage"
import Alert from "../../Components/Alert"
import FormRow from "../../Components/FormRow"
import FormRowSelect from '../../Components/FormRowSelect'

const AddJob = () => {
  // get state
  const { displayAlert, showAlert, isLoading, isEditing, editJobId, position, 
        company, jobLocation, jobTypeOptions, jobType, statusOptions, status, 
        handleChangeGlobal, clearFormValues } = useAppContext()

  // local handleChange: update state in context
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    // context function
    handleChangeGlobal({name, value})
  }

  // submit
  const handleSubmit = (e) => {
    console.log("handleSubmit")
    e.preventDefault()
    if(!position || !company )
      // context function will dispatch action and update state to showAlert
      displayAlert()
      return
    }

    // clear form
    const clearForm = (e) => {
      e.preventDefault()
      clearFormValues()
    }
  


  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>

        {showAlert && <Alert />}

        <h3>Add job/Edit Job</h3>

        <div className="form-center">
          <FormRow type="text" name="position" labelText="Position" value={position} handleChange={handleChange} />
          <FormRow type="text" name="company" labelText="Company" value={company} handleChange={handleChange} />
          <FormRow type="text" name="jobLocation" labelText="Job Location" value={jobLocation} handleChange={handleChange} />
          {/* map jobType options for select component */}
          <FormRowSelect type="select" name="jobType" labelText="Job Type" list={jobTypeOptions} value={jobType} handleChange={handleChange} />
          <FormRowSelect type="select" name="status" labelText="Status" list={statusOptions} value={status} handleChange={handleChange} />
          <div className="btn-container">
            <button className="btn btn-block">Submit</button>
            <button className="btn btn-block clear-btn" onClick={clearForm}>Clear</button>
          </div>
        </div>


      </form>
    </Wrapper>
  )
}

export default AddJob