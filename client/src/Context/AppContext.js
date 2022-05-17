import React, { useContext, useReducer } from "react" // use hooks
import axios from "axios" // axios (allow XMLHttpRequests)
import reducer from "./reducer" // import our reducer
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from "./actions"

// global state
const initialState = {
    isLoading: false, 
    showAlert: false, 
    alertText: "",
    alertType: "",
    user: null, 
    token: null,
    userLocation: "",
    jobLocation: "",

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

    // register user: submit data to api
    const registerUser = async (newUser) => {
        // dispatch action w/payload and set global state
        dispatch({type: REGISTER_USER})

        try {
            const response = await axios.post("/api/v1/auth/register", newUser)
            console.log("response from api: ", response)
            // response: destructure response from api
            const { user, token, location } = response.data
            // dispatch action: w/payload and set global state
            dispatch({
                    type: REGISTER_USER_SUCCESS, 
                    payload: {user, token, location} // payload object
            })
            // set localStorage
        } 
        // get err response object returned from browser
        catch(err) {
            console.log("error registering: ", err.response.data)
            const { message } = err.response.data
            // dispatch action: w/payload and set global state
            dispatch({ 
                type: REGISTER_USER_ERROR, 
                payload: { message } // payload object
            })
        }

        // clear alert
        clearAlert()
    }

    return (
        // provide state, actions to child components
        <AppContext.Provider value={{...state, displayAlert, clearAlert, registerUser }}>{children}</AppContext.Provider>
    )
}

export { AppProvider, initialState, useAppContext}