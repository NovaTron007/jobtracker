import { DISPLAY_ALERT, CLEAR_ALERT, 
    AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_ERROR, TOGGLE_SIDEBAR, 
    LOGOUT_USER, UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from "./actions"

// create reducer: initialState passed from AppContext ie: const [state, dispatch] = useReducer(reducer, initialState)
const reducer = (state, action) => {

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

    default:
        throw new Error(`No such action ${action.type}.`)
    }
}

export default reducer