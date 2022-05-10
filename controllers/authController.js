import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"


export const register = async (req, res, next) => {
        // create user
        const user = await User.create(req.body)
        // response
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: user
        })
}

export const login = (req, res) => {
    res.send("login user")
}

export const updateUser = (req, res) => {
    res.send("update user")
}