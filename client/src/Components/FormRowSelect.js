import React from 'react'

const FormRowSelect = ({labelText, name, value, list, handleChange}) => {
  return (
    <div className="form-row">
        <label htmlFor={name} className="form-label">
          { labelText || name }
        </label>
        <select name={name} value={value} className="form-select" onChange={handleChange}>{/* update value using context */}
            {list.map((item, index) => {
                return (
                    <option value={item} key={index}>{item}</option>
                )
            })}
        </select>
    </div>
  )
}

export default FormRowSelect