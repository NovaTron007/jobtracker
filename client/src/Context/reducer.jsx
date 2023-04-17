// set & update global state here

import {
    DISPLAY_ALERT, CLEAR_ALERT,
    AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_ERROR,
    GET_USER, GET_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER, UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    HANDLE_CHANGE, CLEAR_FORM_VALUES,
    CREATE_JOB, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS, GET_JOBS_SUCCESS,
    SET_EDIT_JOB, UPDATE_JOB, UPDATE_JOB_SUCCESS, UPDATE_JOB_ERROR,
    DELETE_JOB, DELETE_JOB_SUCCESS, DELETE_JOB_ERROR,
    GET_STATS, GET_STATS_SUCCESS,
    CLEAR_FILTERS, CHANGE_PAGE
} from "./actions"

// create reducer: initialState passed from AppContext ie: const [state, dispatch] = useReducer(reducer, initialState)
const reducer = (state, action) => {

    // switch action passed in
    switch (action.type) {
        // ALERT REDUCERS
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: "danger",
                alertMessage: "Please provide all values"
            }
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: "",
                alertMessage: ""
            }
        // AUTH REDUCERS
        case AUTH_USER:
            return {
                ...state,
            }
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                showAlert: true,
                alertType: "success",
                isLoading: false,
                alertMessage: action.payload.alertMessage,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location
            }
        case AUTH_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertMessage: action.payload.alertMessage
            }
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar // access initialState object
            }
        // USER REDUCERS
        case LOGOUT_USER:
            return {
                ...state,
                userLoading: false,
                user: null
            }
        case UPDATE_USER:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertMessage: "User Profile updated!",
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                user: action.payload.user
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertMessage: action.payload.alertMessage
            }
        // FORM REDUCERS
        case HANDLE_CHANGE:
            return {
                ...state,
                page: 1, // reset to page 1 after search
                [action.payload.name]: action.payload.value // update state value by key name
            }
        case CLEAR_FORM_VALUES:
            const initialState = {
                // update state
                isEditing: false,
                editJobId: "",
                position: "",
                company: "",
                jobLocation: state.userLocation, // use default userLocation in state
                jobType: "full-time",
                status: "pending"
            }
            // return updated state
            return {
                ...state,
                ...initialState

                // also ok:
                // isEditing: false,
                // editJobId: "",
                // position: "",
                // company: "",
                // jobLocation: state.userLocation, // use default userLocation in state
                // jobType: "full-time",
                // status: "pending"

            }

        // JOB REDUCERS
        case CREATE_JOB:
            // init
            return {
                ...state,
                isLoading: true
            }
        case CREATE_JOB_SUCCESS:
            // update state
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertMessage: "Job Created!"
            }
        case CREATE_JOB_ERROR:
            // update state
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertMessage: action.payload.alertMessage // get error message from api set in payload
            }
        case GET_JOBS:
            return {
                ...state,
                isLoading: false
            }
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                totalPages: action.payload.totalPages
            }
        case SET_EDIT_JOB:
            // get job of id passed in payload
            const job = state.jobs.find((item) => item._id === action.payload.id)
            // destructure fields
            const { _id, position, company, status, jobType, jobLocation } = job
            // updated state for add/edit job fields
            return {
                ...state,
                editJobId: _id,
                isEditing: true,
                position,
                company,
                status,
                jobType,
                jobLocation
            }
        case UPDATE_JOB:
            return {
                ...state,
                isLoading: false
            }
        case UPDATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertMessage: "Job updated!"
            }
        case UPDATE_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertMessage: action.payload.alertMessage
            }
        }
        case DELETE_JOB:
            return {
                ...state,
                isLoading: false
            }
        case DELETE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                alertType: "success",
                alertMessage: "Job Created!"
            }
        case DELETE_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertMessage: action.payload.alertMessage // get alertMessage from payload obj
            }
        // stats
        case GET_STATS:
            return {
                ...state,
                isLoading: false
            }
        case GET_STATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stats: action.payload.stats,
                monthlyApplications: action.payload.monthlyApplications
            }
        // search job
        case CLEAR_FILTERS:
            return {
                ...state,
                searchJob: "",
                searchJobStatus: "all",
                searchJobType: "all",
                searchJobSortBy: "latest"
            }
        // change page
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload.newPage
            }
        // set db user to state
        case GET_USER:
            return {
                ...state,
                userLoading: true,
                showAlert: false
            }
        // set user in state
        case GET_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location
            }            

        default:
            throw new Error(`No such action ${action.type}.`)
    }
}

export default reducer