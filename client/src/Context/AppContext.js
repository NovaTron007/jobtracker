import React, { useContext, useReducer } from "react" // use hooks
import reducer from "./reducer" // import our reducer
import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions"

// global state
const initialState = {
    isLoading: false, 
    showAlert: false, 
    alertText: "",
    alertType: ""
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
    
    // actions
    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 2000);
    }

    return (
        // provide state, actions to child components
        <AppContext.Provider value={{...state, displayAlert, clearAlert }}>{children}</AppContext.Provider>
    )
}

export { AppProvider, initialState, useAppContext}