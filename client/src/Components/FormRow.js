import React from 'react'

const FormRow = ({type, labelName, labelText, value, handleChange}) => {
    return (
    <div className="form-row">
        <label htmlFor={labelName} className="form-label">{ labelText || labelName }</label>
        <input className="form-input" type={type} value={value} onChange={handleChange} />
    </div>
    )
}

export default FormRow