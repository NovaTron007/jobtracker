import { DISPLAY_ALERT, CLEAR_ALERT, AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_ERROR } from "./actions"

// create reducer
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
    throw new Error(`No such action ${action.type}.`)
}

export default reducer