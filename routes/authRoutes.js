import express from "express"
const router = express.Router()
import { register, login, logout, updateUser, getCurrentUser } from "../controllers/authController.js" // load controllers for routes to call
import authenticateUser from "../middleware/authMiddleware.js" // one default export no need braces
import checkTestUser from "../middleware/checkTestUserMiddleware.js" // check if test user

// prepended: /api/v1/auth
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)

// prepended: /api/v1/jobs
// pass auth middleware, checkTestUser after authenticateUser & before updateUser
router.route("/updateUser").patch(authenticateUser, checkTestUser, updateUser) 

// route to check req obj sent from client: check for id in token (for refresh pages etc. as user only auth during login request)
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser)


//export the router
export default router