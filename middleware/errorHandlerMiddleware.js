import { StatusCodes } from "http-status-codes"


const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("err.message: ", err.message) // access js error object: throw new Error("Please provide all values")
    
    // create object for errors: check if set statusCode js Error object
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Server error"
    }
    
    // validation error
    if(err.name === "ValidationError") {
        // err.errors.currentItem.message loop err object values into array
        const messages = Object.values(err.errors).map((item) => item.message).join(", ") 
        // update custom error object
        defaultError.statusCode = StatusCodes.BAD_REQUEST,
        defaultError.message = messages
    }
    
    // unique fields error: update custom err object with err.keyValue's key name
    if(err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.message = `${Object.keys(err.keyValue)} must be unique` 
    }

    // mongoose format error
    if(err.name === "CastError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.message = `Resource not found with id: ${err.value}`
    }

    // response
    res.status(defaultError.statusCode).json({
        message: defaultError.message, 
        statusCode: defaultError.statusCode
    })
}

export default errorHandlerMiddleware