const express = require("express")
const router = express.Router()
const { registerUser, loginUser, updateUser } = require("../controllers/authController") // load controllers for routes to call

// prepended: /api/v1/auth
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/updateUser").patch(updateUser)


//export the router
module.exports = router