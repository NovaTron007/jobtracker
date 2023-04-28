import express from "express"

// prepend routes
const router = express.Router() 

// rate limit on this routes
import rateLimiter from "express-rate-limit" 
const apiLimiter = rateLimiter ({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 10, // 10 requests max in 15 mins
    message: "Too many requests from this IP address, please try again in 15 mins"
})

// controllers & middleware
import { register, login, logout, updateUser, getCurrentUser } from "../controllers/authController.js" // load controllers for routes to call
import authenticateUser from "../middleware/authMiddleware.js" // one default export no need braces
import checkTestUser from "../middleware/checkTestUserMiddleware.js" // check if test user

// prepended: /api/v1/auth
router.route("/register").post(apiLimiter, register)
router.route("/login").post(apiLimiter, login)
router.route("/logout").get(logout)

// prepended: /api/v1/jobs
// pass auth middleware, checkTestUser after authenticateUser & before updateUser
router.route("/updateUser").patch(authenticateUser, checkTestUser, updateUser) 

// route to check req obj sent from client: check for id in token (for refresh pages etc. as user only auth during login request)
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser)


//export the router
export default router