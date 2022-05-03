import React from 'react'
import { useAppContext } from "../Context/AppContext" // get global state from context

function Alert() {
  // get state from context
  const {alertType, alertText} = useAppContext()

  return (
    <div className={`alert alert-${alertType}`}>{alertText}</div>
  )
}

export default Alert