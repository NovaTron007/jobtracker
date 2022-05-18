import React from 'react'
import { useAppContext } from "../Context/AppContext" // get global state from context

function Alert() {
  // get state from context
  const {alertType, alertMessage} = useAppContext()

  return (
    <div className={`alert alert-${alertType}`}>{alertMessage}</div>
  )
}

export default Alert