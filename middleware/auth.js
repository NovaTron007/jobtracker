import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken" // call it what we want
import { CustomErrorMessage } from "../errors/index.js"

// set user here
const authenticateUser = async (req, res, next) => {
    // get token sent in headers
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")) { // check header string ie: Bearer token
        throw new CustomErrorMessage("Authentication Invalid!", StatusCodes.UNAUTHORIZED)
    }
    // get token part convert to array and split at space: Bearer token
    const token = authHeader.split(" ")[1]

    // compare tokens
    try {
        const decodedTokenPayload = jwt.verify(token, process.env.JWT_SECRET) // userid, issue at, exp
        console.log("decodedTokenPayload: ", decodedTokenPayload)

        // is the testUser ID from db
        const isTestUser = decodedTokenPayload.id === "641322b94318fa4d43a5d5de"
        console.log("testUser:  ", isTestUser)

        // add to req object: set req.user to new object with id sent in token (req object sent in url), add isTestuser (true or false to obj)
        req.user = { userId: decodedTokenPayload.id, isTestUser }

        // next middleware (controller in this case)
        next() 

    } catch(err) {
        throw new CustomErrorMessage("Authentication Invalid!")
    }

}

export default authenticateUser
