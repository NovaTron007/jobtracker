import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/index.js" // use {} when not default func

// check user obj set in auth.js
const checkTestUser = async (req, res, next) => {
    // check if req.user.isTestUser is true/false from auth.js
    if(req.user.isTestUser) {
        throw new BadRequestError("Unauthorized access, test user!", StatusCodes.BAD_REQUEST)
    } else {
        next()
    }
}

export default checkTestUser