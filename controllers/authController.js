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

    // response object
    res.status(StatusCodes.CREATED).json({
        success: true,
        user: {email: user.email, name: user.name, lastName: user.lastName, location: user.location}, // send specific fields
        location: user.location,
        token
    })
}

export const login = async (req, res) => {
    // get req.body
    const { email, password } = req.body

    // check fields
    if(!email || !password) {
        throw new CustomErrorMessage(`Please complete all fields!`, StatusCodes.BAD_REQUEST)
    }

   // get user from db
   const user = await User.findOne({email}).select("+password") // access password field: select is false in model
   console.log("login (user): ", user)
   
   // check user
   if(!user) {
       throw new CustomErrorMessage("Invalid credentials", StatusCodes.UNAUTHORIZED)
   }
   
   // check passwords to db: use bcrypt to compare passwords (returns boolean)
   const passwordMatch = await user.comparePassword(password)
   console.log("passwordMatch: ", passwordMatch)
   if(!passwordMatch) {
       throw new CustomErrorMessage("Invalid credentials", StatusCodes.UNAUTHORIZED)
   }

   // create jwt
   const token = await user.createJWT()
   user.password = undefined // don't show password in response
   
   // response
   res.status(StatusCodes.OK).json({
       user,
       token,
       location: user.location
   })
}

export const updateUser = async (req, res, next) => {
    const { email, name, lastName, location } = req.body

    if(!email || !name || !lastName || !location) {
        throw new CustomErrorMessage("Please complete all fields!", StatusCodes.BAD_REQUEST)
    }
    // find user by id
    const user = await User.findOne({_id: req.user.userId})
    // set user fields
    user.email = email,
    user.name = name,
    user.lastName = lastName,
    user.location = location

    // save user
    await user.save()

    // create fresh token
    const token = await user.createJWT()

    res.status(StatusCodes.OK).json({
        user,
        token,
        location: user.location
    })
}