import React from 'react'

const FormRow = ({type, name, labelText, value, handleChange}) => {
    return (
    <div className="form-row">
        <label htmlFor={name} className="form-label">{ labelText || name }</label>
        <input 
            className="form-input"
            type={type} 
            value={value ? value : ""} 
            name={name} 
            onChange={handleChange} 
         />
    </div>
    )
}

export default FormRow