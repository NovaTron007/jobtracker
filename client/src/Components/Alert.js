import React from 'react'
import { useAppContext } from "../Context/AppContext" // get global state from context

function Alert() {
  // get state from context to change class of alert
  const {alertType, alertMessage} = useAppContext()

  return (
    <div className={`alert alert-${alertType}`}>{alertMessage}</div>
  )
}

export default Alert