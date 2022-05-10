import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    // use status code in object
    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Server error"
    }
    // response
    res.status(defaultError.statusCode).json({
        message: "There as an error", 
        err: err
    })
}

export default errorHandlerMiddleware