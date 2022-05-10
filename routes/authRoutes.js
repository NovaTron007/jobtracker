import express from "express"
const router = express.Router()
import { register, login, updateUser } from "../controllers/authController.js" // load controllers for routes to call

// prepended: /api/v1/auth
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/updateUser").patch(updateUser)


//export the router
export default router