import React, { useContext, useReducer } from "react" // use hooks
import axios from "axios" // axios (allow XMLHttpRequests)
import reducer from "./reducer" // import our reducer
import { CLEAR_ALERT, DISPLAY_ALERT, AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER } from "./actions"



// localStorage: check any storage before init
const user = localStorage.getItem("user")
const token = localStorage.getItem("token")
const userLocation = localStorage.getItem("location")

// localStorage: add user by passing object, initialise global state                                         
const addUserToLocalStorage = ({user, token, location}) => {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
    localStorage.setItem("location", location)
}
const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("location")
}

// global state
const initialState = {
    isLoading: false, 
    showAlert: false, 
    alertMessage: "",
    alertType: "",
    user: user ? JSON.parse(user) : null, // parse object from storage
    token: token ? token : null,
    userLocation: userLocation || null,
    jobLocation: userLocation || null,
    showSidebar: false
}

// create context
const AppContext = React.createContext()

// use our AppContext
const useAppContext = () => {
    return useContext(AppContext) // react hook must use term "use"
}

// provider (provide data to child components in index.js)
const AppProvider = ({children}) => {
    
    // set state: use dispatch for useReducer (accepts the reducer, initialState)
    const [state, dispatch] = useReducer(reducer, initialState)
    
    // dispatch actions from  reducer: to control state
    const displayAlert = () => {
        // dispatch action
        dispatch({type: DISPLAY_ALERT})
        // clear alert
        clearAlert()
    }

    // clear alert
    const clearAlert = () => {
        setTimeout(() => {
            // dispatch action
            dispatch({type: CLEAR_ALERT})
        }, 2000);
    }

    // register user: submit data to api, destructure object
    const authUser = async ({currentUser, endpoint, alertMessage}) => {
        // dispatch action w/payload and set global state
        dispatch({type: AUTH_USER})
        console.log("authUser: ", currentUser)
        // call api and pass user object
        try {
            const response = await axios.post(`/api/v1/auth/${endpoint}`, currentUser)
            console.log("response from api: ", response)
            // response: destructure response from api
            const { user, token, location } = response.data
            // dispatch action: w/payload and set global state
            dispatch({
                    type: AUTH_USER_SUCCESS, 
                    payload: {user, token, location, alertMessage} // payload object
            })
            // set localStorage: add object
            addUserToLocalStorage({user, token, location})
        } 
        // get err response object returned from browser
        catch(err) {
            err && console.log("error registering: ", err.response.data)
            const { message } = err.response.data
            // dispatch action: w/payload and set global state
            dispatch({ 
                type: AUTH_USER_ERROR, 
                payload: {alertMessage: message} // payload object
            })
        }

        // clear alert
        clearAlert()
    }

    // toggle sidebar
    const toggleSidebar = () => {
        dispatch({
            type: TOGGLE_SIDEBAR
        })
    }

    // logout
    const logoutUser = () => {
        dispatch({
            type: LOGOUT_USER 
        })
        // clear storage
        removeUserFromLocalStorage()
    }

    const updateUser = async (user) => {
        dispatch({
            type: UPDATE_USER,
            isLoading: true,
            payload: {user: user},
        })
        console.log("updateUser", user)
    }


    return (
        // provide state, actions to child components
        <AppContext.Provider value={{...state, displayAlert, clearAlert, authUser, toggleSidebar, logoutUser, updateUser }}>{children}</AppContext.Provider>
    )
}

export { AppProvider, initialState, useAppContext}