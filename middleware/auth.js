import jsonwebtoken from "jsonwebtoken"
import { CustomErrorMessage } from "../errors/index.js"

const authenticateUser = async (req, res, next) => {
    // get token sent in headers
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")) { // check header string ie: Bearer token
        throw new CustomErrorMessage("Authentication Invalid!")
    }
    // get token part convert to array and split at space: Bearer token
    const token = authHeader.split(" ")[1]
    // compare tokens
    try {
        const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET) // userid, issue at, exp
        req.user = { userId: decodedToken.id } // add to req object: set req.user to new object with id sent in token
    } catch(err) {
        throw new CustomErrorMessage("Authentication Invalid!")
    }
    next() // next middleware (controller in this case)
}

export default authenticateUser
