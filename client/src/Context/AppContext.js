import React, { useContext, useEffect, useReducer } from "react" // use hooks
import axios from "axios" // axios (allow XMLHttpRequests)
import reducer from "./reducer" // import our reducer
import { 
    CLEAR_ALERT, DISPLAY_ALERT, AUTH_USER, 
    AUTH_USER_SUCCESS, AUTH_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, 
    UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    CREATE_JOB, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR,
    GET_JOBS, GET_JOBS_SUCCESS,
    HANDLE_CHANGE, CLEAR_FORM_VALUES,
    SET_EDIT_JOB, UPDATE_JOB, UPDATE_JOB_SUCCESS, UPDATE_JOB_ERROR,
    DELETE_JOB, DELETE_JOB_SUCCESS, DELETE_JOB_ERROR,
    GET_STATS, GET_STATS_SUCCESS,
    CLEAR_FILTERS, CHANGE_PAGE, GET_USER, GET_USER_SUCCESS
} from "./actions"

// global state
const initialState = {
    // when refresh page look for user
    userLoading: true,
    // loading and alerts
    isLoading: false, 
    showAlert: false,
    alertMessage: "",
    alertType: "",
    // UI
    showSidebar: false,
    // user
    user: null,
    userLocation: null,
    jobLocation: null,
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

    // AXIOS
    // axios instance for making requests with options ie sending bearer token
    const authFetch = axios.create({
        baseURL: "/api/v1"
    })

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
        console.log("endpoint:", endpoint)
        // dispatch action w/payload and set global state
        dispatch({type: AUTH_USER})
        // call api and pass user object
        try {
            const response = await axios.post(`/api/v1/auth/${endpoint}`, currentUser)
            console.log("response from api: ", response)
            // response: destructure response from api
            const { user, location } = response.data
            // dispatch action: w/payload and set global state
            dispatch({
                    type: AUTH_USER_SUCCESS, 
                    payload: {user, location, alertMessage} // payload object
            })
        } 
        // get err response object returned from browser
        catch(err) {
            // too many requests
            if(err.response.status === 429) {
                console.log("err.response.status: ", err.response.status)
                dispatch({
                    type: AUTH_USER_ERROR,
                    payload: {
                        alertMessage: "Too many request from this IP!"
                    }
                })
                clearAlert()
                return; // return out of whole block: stop code running below removing above alertMessage
            }
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
    const logoutUser = async () => {
        try {
            await authFetch.get("/auth/logout")
        } catch (err) {
            console.log("logout user error: ", err.response.message)
        }
        dispatch({
            type: LOGOUT_USER
        })
    }

    // update user
    const updateUser = async (currentUser) => {
        // dispatch action
        dispatch({type: UPDATE_USER})

        try {
            // destructure response.data from axios response
            const { data } = await authFetch.patch("/auth/updateUser/", currentUser)
            // destructure data
            const { user, location } = data
            // dispatch action
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location } // payload object
            })

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

    // get current user
    const getCurrentUser = async () => {
        // dispatch
        dispatch({ type: GET_USER }) 
        try {
            // user back from api
            const { data } = await authFetch(`/auth/getCurrentUser`)
            const { user, location } = data
            dispatch({
                type: GET_USER_SUCCESS,
                payload: { user, location }
            })
        // unauthorised will return 401
        } catch(err) {
            if(err.response.status === 401) return
            console.log("getCurrentUser context error: ", err.response.data.message)
            logoutUser()
        }
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
    const updateJob = async (id) => {
        console.log("edit job")
        // begin update job
        dispatch({
            type: UPDATE_JOB
        })

        // get state
        try {
            // get state
            const { position, company, jobLocation, jobType, status } = state
            // send data
            await authFetch.patch(`/jobs/${id}`, {
                position,
                company,
                jobLocation, 
                jobType, 
                status
            })
            // success
            dispatch({type: UPDATE_JOB_SUCCESS})
            // clear form values
            dispatch({ type: CLEAR_FORM_VALUES })
        } catch(err) {
            dispatch({
                type: UPDATE_JOB_ERROR,
                payload: {alertMessage:err.response.data.message }

            })
        }
        // clear alert
        clearAlert()
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
            dispatch({
                type: DELETE_JOB_ERROR,
                payload: {alertMessage:err.response.data.message }
            })
            // clear alert
            clearAlert()
            // logout
            // logoutUser()
        }
    }

    // get stats
    const getStats = async () => {
        console.log("getStats")
        // init 
        dispatch({type: GET_STATS})
        // get response
        try {
            const { data } = await authFetch("/jobs/stats") // api url to get stats (axios default is get so can omit)
            console.log("data getStats: ", data)
            dispatch({
                type: GET_STATS_SUCCESS,
                payload: { stats: data.defaultStats, monthlyApplications: data.monthlyApplications }
            })
        } catch (err) {
            // logoutUser()
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

    useEffect(() => {
        getCurrentUser()
      }, [])



    return (
        // provide state, actions to child components
        <AppContext.Provider value={{
            ...state, 
            displayAlert, clearAlert, toggleSidebar, 
            authUser, logoutUser, updateUser,
            handleChangeGlobal, clearFormValues,
            createJob, getJobs, setEditJob, updateJob, deleteJob,
            getStats, 
            clearFilters,
            changePage
        }}>{children}</AppContext.Provider>
    )
}

export { AppProvider, initialState, useAppContext}