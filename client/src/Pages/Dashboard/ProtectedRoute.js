import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from "../../Context/AppContext"

// protected route: for home page "/"
const ProtectedRoute = ({children}) => {
    // get user from context
    const { user } = useAppContext()
    
    // check user: navigate to child route 
    if(!user) {
        return <Navigate to="/landing" />
    } else {
        // navigate to child routes
        return children
    }
}

export default ProtectedRoute