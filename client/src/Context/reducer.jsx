import { DISPLAY_ALERT, CLEAR_ALERT, AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER } from "./actions"

// create reducer: initialState passed from AppContext ie: const [state, dispatch] = useReducer(reducer, initialState)
const reducer = (state, action) => {
    if(action.type === DISPLAY_ALERT) {
        return {
            ...state, 
            showAlert: true,
            alertType: "danger",
            alertMessage: "Please provide all values"
        }
    }
    if(action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertMessage: ""
        }
    }
    if(action.type === AUTH_USER) {
        return {
            ...state, 
            isLoading: false
        }
    }
    if(action.type === AUTH_USER_SUCCESS) {
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
    }
    if(action.type === AUTH_USER_ERROR) {
        console.log("reducer state: ", state)
        return {
            ...state,
            isLoading: false,
            showAlert: true, 
            alertType: "danger",
            alertMessage: action.payload.alertMessage
        }
    }
    if(action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar // access initialState object
        }
    }
    if(action.type === LOGOUT_USER) {
        return {
            ...state,
            user: null,
            token: null,
            userLocation: null,
            jobLocation: null 
            
        }
    }
    throw new Error(`No such action ${action.type}.`)
}

export default reducer