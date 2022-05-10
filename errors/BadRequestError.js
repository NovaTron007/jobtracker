import CustomErrorMessage from "./CustomErrorMessage.js" // import parent class

// use CustomErrorMessage to set custom message
class BadRequestError extends CustomErrorMessage {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export default BadRequestError