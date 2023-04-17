import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/index.js" // use {} when not default func

// check user obj set in authMiddleware.js
const checkTestUser = async (req, res, next) => {
    // check if req.user.isTestUser is true/false from authMiddleware.js
    if(req.user.isTestUser) {
        throw new BadRequestError("Unauthorized access, test user!", StatusCodes.UNAUTHORIZED)
    } else {
        next()
    }
}

export default checkTestUser