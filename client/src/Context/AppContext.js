import React, { useContext, useEffect, useReducer } from "react" // use hooks
import axios from "axios" // axios (allow XMLHttpRequests)
import reducer from "./reducer" // import our reducer
import { 
    CLEAR_ALERT, DISPLAY_ALERT, AUTH_USER, 
    AUTH_USER_SUCCESS, AUTH_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, 
    UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    CREATE_JOB, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR,
    GET_JOBS, GET_JOBS_SUCCESS,
    HANDLE_CHANGE, CLEAR_FORM_VALUES, SET_EDIT_JOB,
    DELETE_JOB, DELETE_JOB_SUCCESS, GET_STATS, GET_STATS_SUCCESS,
    CLEAR_FILTERS, CHANGE_PAGE
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
    // loading and alerts
    isLoading: false, 
    showAlert: false,
    alertMessage: "",
    alertType: "",
    // UI
    showSidebar: false,
    // user
    user: user ? JSON.parse(user) : null, // parse object from storage
    token: token ? token : null,
    userLocation: userLocation || null,
    jobLocation: userLocation || null,
    // job state
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    jobTypeOptions: ["full-time", "part-time", "freelance", "remote"],
    jobType: "full-time",
    statusOptions: ["interview", "declined", "pending"],
    status: "pending",
    // jobs
    jobs: [],
    totalJobs: 0,
    totalPages: 1,
    page: 1,
    // stats
    stats: {},
    monthlyApplications: [],
    // search 
    searchJob: "",
    searchJobStatus: "all",
    searchJobType: "all",
    searchJobSortBy: "latest",
    searchJobSortByOptions: ["latest", "oldest", "a-z", "z-a"]
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
        }, 1000);
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

    // form input change and add to state
    const handleChangeGlobal = ({name, value}) => {
        console.log("name, value: ", name, value)
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

    // create job
    const createJob = async () => {
        // init 
        dispatch({type: CREATE_JOB})
        // get state
        try {
            // get state
            const { position, company, jobLocation, jobType, status } = state
            // send data
            await authFetch.post("/jobs/", {
                position,
                company,
                jobLocation, 
                jobType, 
                status
            })
            // success
            dispatch({type: CREATE_JOB_SUCCESS})
            // clear form
            dispatch({type: CLEAR_FORM_VALUES})
        }
        catch(err) {
            console.log("err: ", err)
            // not authorised: return (interceptor will logout user)
            if(err.response.status === 401) return
            // show api error if frontend not caught
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { alertMessage:  err.response.data.message}     
            })
        }
        // show alert
        clearAlert()
    }

    // get jobs
    const getJobs = async() => {
        // get search state values
        const { searchJob, searchJobSortBy, searchJobStatus, searchJobType } = state
        // create api call with search state values
        let url = `/jobs/?status=${searchJobStatus}&jobType=${searchJobType}&sort=${searchJobSortBy}`
        // check if search input has search value
        if(searchJob) {
            url = url + `&search=${searchJob}`
        }
        // init
        dispatch({type: GET_JOBS})
        
        // get response
        try {
            const { data } = await authFetch.get(url) // pass updated url
            // destructure
            const { jobs, totalJobs, totalPages } = data
            // send to store
            dispatch({
                type: GET_JOBS_SUCCESS, 
                payload: { jobs, totalJobs, totalPages }
            })
        } catch(err) {
            logoutUser()
        }
        
        // clear alerts if any
        clearAlert()
    }

    // set job to edit
    const setEditJob = (id) => {
        console.log("set editJob id: ", id)
        dispatch({
            type: SET_EDIT_JOB, 
            payload: {id} 
        })
    }

    // edit job
    const editJob = () => {
        console.log("edit job")
    }

    // delete job
    const deleteJob = async (id) => {
        // init
        dispatch({
            type: DELETE_JOB
        })

        // delete request
        try {
            // delete with id
            await authFetch.delete(`/jobs/${id}`)
            // dispatch
            dispatch({
                type: DELETE_JOB_SUCCESS
            }) 
            // refresh jobs
            getJobs()
        } catch (err) {
            logoutUser()
        }
    }

    // get stats
    const getStats = async () => {
        // init 
        dispatch({type: GET_STATS})
        // get response
        try {
            const { data } = await authFetch("/jobs/stats") // api url to get stats (axios default is get so can omit)
            dispatch({
                type: GET_STATS_SUCCESS,
                payload: { stats: data.defaultStats, monthlyApplications: data.monthlyApplications }
            })
        } catch (err) {
            logoutUser()
        }
        // clear alerts
        clearAlert()
    }

    // clear filters
    const clearFilters = () => {
        console.log("clearFilters")
        //dispatch 
        dispatch({
            type: CLEAR_FILTERS
        })
    }

    // paginate: receive newPage
    const changePage = (newPage) => {
        // dispatch action
        dispatch({
            type: CHANGE_PAGE,
            payload: { newPage }
        })
    }


    // get jobs on render
    useEffect(() => {
        getJobs()
    }, [])


    return (
        // provide state, actions to child components
        <AppContext.Provider value={{
            ...state, 
            displayAlert, clearAlert, toggleSidebar, 
            authUser, logoutUser, updateUser,
            handleChangeGlobal, clearFormValues,
            createJob, getJobs, setEditJob, editJob, deleteJob,
            getStats, 
            clearFilters,
            changePage
        }}>{children}</AppContext.Provider>
    )
}

export { AppProvider, initialState, useAppContext}