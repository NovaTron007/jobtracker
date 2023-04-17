import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken" // call it what we want
import { CustomErrorMessage } from "../errors/index.js"

// get user cookie token from client and set user here in req object
const authenticateUser = async (req, res, next) => {
    // get cookie sent in from browser (cookie created in server and sent back to client)    
    const token = req.cookies.token
    // console.log("token from client: ", token)
    
    // if no token sent in req obj
    if(!token){
        throw new CustomErrorMessage("Unauthorised Access!", StatusCodes.UNAUTHORIZED)
    }

    // compare tokens
    try {
        const decodedTokenPayload = jwt.verify(token, process.env.JWT_SECRET) // userid, issue at, exp
        // console.log("decodedTokenPayload: ", decodedTokenPayload)

        // is the testUser ID from db
        const isTestUser = decodedTokenPayload.id === "641322b94318fa4d43a5d5de"
        console.log("testUser:  ", isTestUser)

        // add to req object: set req.user to new object with id sent in token (req object sent in url), add isTestuser (true or false to obj)
        req.user = { userId: decodedTokenPayload.id, isTestUser }
        console.log("req.user authmiddleware: ",req.user.userId)
        next()


    } catch(err) {
        throw new CustomErrorMessage(`authMiddleware ${err.message}`, StatusCodes.BAD_REQUEST)
    }    
}

export default authenticateUser
