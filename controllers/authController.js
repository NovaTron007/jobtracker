import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { CustomErrorMessage } from "../errors/index.js"
import setCookie from "../utils/setCookie.js"

export const register = async (req, res) => {
    // get req.body
    const { name, email, password } = req.body
    
    // use custom errors: add message to js Error object before errorHandlerMiddleware response
    if (!name || !email || !password) {
        throw new CustomErrorMessage("Please provide all values", StatusCodes.BAD_REQUEST)
    }

    // check user exists
    const userAlreadyExists = await User.findOne({ email })
    
    // use custom errors: add message to js Error object before errorHandlerMiddleware response
    if (userAlreadyExists) {
        throw new CustomErrorMessage(`Email already exists`, StatusCodes.BAD_REQUEST)
    }

    // create user
    const user = await User.create({ name, email, password })

    // 1. create fresh token
    const token = await user.createJWT()
    
    // 2. helper func to set cookie: pass in response obj & jwt token to set cookie
    setCookie({ res, token })

    // response object
    res.status(StatusCodes.CREATED).json({
        success: true,
        user: { email: user.email, name: user.name, lastName: user.lastName, location: user.location }, // send specific fields
        location: user.location
    })
}

export const login = async (req, res) => {
    // get req.body
    const { email, password } = req.body

    // check fields
    if (!email || !password) {
        throw new CustomErrorMessage(`Please complete all fields!`, StatusCodes.BAD_REQUEST)
    }

    // 1. get user from db
    const user = await User.findOne({ email }).select("+password") // access password field: select is false in model

    // check user
    if (!user) {
        throw new CustomErrorMessage("Invalid credentials", StatusCodes.UNAUTHORIZED)
    }

    // check passwords to db: use bcrypt to compare passwords (returns boolean)
    const passwordMatch = await user.comparePassword(password)
    console.log("passwordMatch: ", passwordMatch)
    
    if (!passwordMatch) {
        throw new CustomErrorMessage("Invalid credentials", StatusCodes.UNAUTHORIZED)
    }

    // 2. create jwt token with user id
    const token = await user.createJWT()
    
    // 3. helper func to set cookie : pass in response obj & jwt token to set req.cookie
    setCookie({ res, token })

    // don't show password in response
    user.password = undefined 

    console.log("login req.user: ", req.user)

    // response
    res.status(StatusCodes.OK).json({
        user,
        location: user.location
    })
}

    // logout user (pass in res obj)
    export const logout = async ({res}) => {
        // set jwt in cookie in response obj to client (cookie: name, value (jwt), options - res.cookie auto returns in res header)
        res.cookie("token", "logout",
            {
                httpOnly: true,
                expires: new Date(Date.now()) , // expiry
                secure: process.env.NODE_ENV === "production" // set to https only if production
            }
        )
        res.status(StatusCodes.OK).json({
            message: "User logged out"
        })
    }

export const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body

    if (!email || !name || !lastName || !location) {
        throw new CustomErrorMessage("Please complete all fields!", StatusCodes.BAD_REQUEST)
    }
    // find user by id
    const user = await User.findOne({ _id: req.user.userId })
    
    // set user fields
    user.email = email,
    user.name = name,
    user.lastName = lastName,
    user.location = location

    // save user
    await user.save()

    // 1. create fresh token
    const token = await user.createJWT()
    
    // 2. helper func to set cookie: pass in response obj & jwt token to set cookie
    setCookie({ res, token })

    res.status(StatusCodes.OK).json({
        user,
        location: user.location
    })
}

// after login, token, userId is created & sent back to client, if we refresh page (error) no request is made to get user
export const getCurrentUser = async (req, res) => {
    console.log("getCurrentUser func: ", req.user.userId)
    // req.user.userId was set from (decoded in authenticateUser() )
    const user = await User.findOne({_id: req.user.userId }) // find user with id

    // response
    res.status(StatusCodes.OK).json({
        user: user,
        location: user.location
    })
}