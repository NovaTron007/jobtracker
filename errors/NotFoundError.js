import { StatusCodes } from "http-status-codes"
import CustomErrorMessage from "./CustomErrorMessage.js"

// use CustomErrorMessage to set custom message
class NotFoundError extends CustomErrorMessage {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError