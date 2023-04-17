import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from "../../Context/AppContext"
import Loading from "../../Components/Loading"

// protected route: for home page "/"
const ProtectedRoute = ({children}) => {
    // get user from context
    const { user, userLoading } = useAppContext()

    // if user is loading from api
    if(userLoading) return  <Loading />
    
    // check user: navigate to child route 
    if(!user) {
        return <Navigate to="/landing" />
    } else {
        // navigate to child routes
        return children
    }
}

export default ProtectedRoute