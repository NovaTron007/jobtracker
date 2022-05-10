// Extending js Error class to add custom error message
class CustomErrorMessage extends Error {
    constructor(message, statusCode) {
        super(message) // use message property from Error class
        this.statusCode = statusCode // add a new property to Error class
    }
}

export default CustomErrorMessage