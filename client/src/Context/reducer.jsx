import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from "./actions"

// create reducer
const reducer = (state, action) => {
    if(action.type === DISPLAY_ALERT) {
        return {
            ...state, 
            showAlert: true,
            alertType: "danger",
            alertText: "Please provide all values"
        }
    }
    if(action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertText: ""
        }
    }
    if(action.type === REGISTER_USER) {
        return {
            ...state, 
            isLoading: false
        }
    }
    if(action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token, 
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: "success",
            alertText: "User created! Redirecting..."
        }
    }
    if(action.type === REGISTER_USER_ERROR) {
        console.log("reducer state: ", state)
        return {
            ...state,
            isLoading: false,
            showAlert: true, 
            alertType: "danger",
            alertText: action.payload.message
        }
    }
    throw new Error(`No such action ${action.type}.`)
}

export default reducer