import express from "express"
const router = express.Router()
import { register, login, updateUser } from "../controllers/authController.js" // load controllers for routes to call
import authenticateUser from "../middleware/auth.js" // one default export no need braces
import checkTestUser from "../middleware/checkTestUserMiddleware.js" // check if test user

// prepended: /api/v1/auth
router.route("/register").post(register)
router.route("/login").post(login)

// pass auth middleware, checkTestUser after authenticateUser & before updateUser
router.route("/updateUser").patch(authenticateUser, checkTestUser, updateUser) 


//export the router
export default router