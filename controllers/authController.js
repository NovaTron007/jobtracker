import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { CustomErrorMessage } from "../errors/index.js"


export const register = async (req, res, next) => {
        // get req.body
        const { name, email, password } = req.body
        // use custom errors: add message to js Error object before errorHandlerMiddleware response
        if(!name || !email || !password) {
            throw new CustomErrorMessage("Please provide all values", StatusCodes.BAD_REQUEST)
        }

        // check user exists
        const userAlreadyExists = await User.findOne({ email })
        // use custom errors: add message to js Error object before errorHandlerMiddleware response
        if(userAlreadyExists) {
            throw new CustomErrorMessage(`Email already exists`, StatusCodes.BAD_REQUEST)
        }
        
        // create user
        const user = await User.create({ name, email, password })

        // create jwt
        const token = user.createJWT()

        // response
        res.status(StatusCodes.CREATED).json({
            success: true,
            user: {email: user.email, name: user.name, lastName: user.lastName, location: user.location},
            token
        })
}

export const login = (req, res) => {
    res.send("login user")
}

export const updateUser = (req, res) => {
    res.send("update user")
}