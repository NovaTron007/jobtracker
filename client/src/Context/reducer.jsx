import { DISPLAY_ALERT, CLEAR_ALERT, 
    AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_ERROR, TOGGLE_SIDEBAR, 
    LOGOUT_USER, UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    HANDLE_CHANGE, CLEAR_FORM_VALUES,
    CREATE_JOB, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS, GET_JOBS_SUCCESS
} from "./actions"

// create reducer: initialState passed from AppContext ie: const [state, dispatch] = useReducer(reducer, initialState)
const reducer = (state, action) => {
console.log("action.payload: ", action.payload)
console.log("action.payload: ", typeof action.payload)

switch(action.type) {
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
    case AUTH_USER:
        return {
            ...state, 
            isLoading: false
        }
    case AUTH_USER_SUCCESS:
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token, 
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: "success",
            alertMessage: action.payload.alertMessage
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
    case LOGOUT_USER:
        return {
            ...state,
            user: null,
            token: null,
            userLocation: null,
            jobLocation: null 
            
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
            token:action.payload.token,
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
    case HANDLE_CHANGE: 
        return {
            ...state,
            [action.payload.name]: action.payload.value // initial state key name: set value
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
                alertMessage: action.payload.message // get error message from api set in payload
            }
    case GET_JOBS: 
        return {
            ...state, 
            isLoading: true
    }
    case GET_JOBS_SUCCESS: 
        return {
            ...state, 
            isLoading: false, 
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            totalPages: action.payload.totalPages        }      

    default:
        throw new Error(`No such action ${action.type}.`)
    }
}

export default reducer