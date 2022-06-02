import React, { useContext, useReducer } from "react" // use hooks
import axios from "axios" // axios (allow XMLHttpRequests)
import reducer from "./reducer" // import our reducer
import { 
    CLEAR_ALERT, DISPLAY_ALERT, AUTH_USER, 
    AUTH_USER_SUCCESS, AUTH_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, 
    UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    ADD_JOB, ADD_JOB_SUCCESS, ADD_JOB_ERROR,
    HANDLE_CHANGE, CLEAR_FORM_VALUES
} from "./actions"



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
    showSidebar: false,
    // job state
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobTypeOptions: ["full-time", "part-time", "freelance", "remote"],
    jobType: "full-time",
    statusOptions: ["interview", "declined", "pending"],
    status: "pending"
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

    // sending bearer token in every request (we won't use this)
    // axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`

    // AXIOS
    // axios instance for making requests with options ie sending bearer token
    const authFetch = axios.create({
        baseURL: "/api/v1"
    })

    // request interceptor: send token to server
    authFetch.interceptors.request.use((config) => {
        config.headers.common["Authorization"] = `Bearer ${state.token}`
        return config
    }, (err) => {
            return Promise.reject(err)
        }
    )

    // response interceptor 
    authFetch.interceptors.response.use((response) => {
        return response
    }, (err) => {
        // check err response status set in class
        if(err.response.status === 401) {
            logoutUser()
        }
        return Promise.reject(err)
      }
    )


    // ACTIONS:
    
    // dispatch actions from  reducer: to control state
    const displayAlert = () => {
        // dispatch action display alert w/default error message in reducer
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

    // update user
    const updateUser = async (currentUser) => {
        // dispatch action
        dispatch({type: UPDATE_USER})

        try {
            // destructure response.data from axios response
            const { data } = await authFetch.patch("/auth/updateUser/", currentUser)
            // destructure data
            const { user, location, token } = data
            // dispatch action
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token } // payload object
            })
            // update localstorage
            addUserToLocalStorage({user, location, token})

        } catch(err) {
            console.log("err updateUser: ", err.response.data)
            // user logged in
            if(err !== 401) {
                dispatch({ 
                    type: UPDATE_USER_ERROR,
                    payload: { alertMessage: err.response.data.message }
                })
            }
        }
        // clear alert
        clearAlert()
    }

    // input change
    const handleChangeGlobal = ({name, value}) => {
        // add job
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value }
        })
    }

    // clear values
    const clearFormValues = () => {
        dispatch({
             type: CLEAR_FORM_VALUES
        })
    }


    return (
        // provide state, actions to child components
        <AppContext.Provider value={{
            ...state, 
            displayAlert, clearAlert, toggleSidebar, 
            authUser, logoutUser, updateUser,
            handleChangeGlobal, clearFormValues
        }}>{children}</AppContext.Provider>
    )
}

export { AppProvider, initialState, useAppContext}