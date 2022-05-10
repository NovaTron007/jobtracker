const express = require("express")
const router = express.Router()
const { register, login, updateUser } = require("../controllers/authController") // load controllers for routes to call

// prepended: /api/v1/auth
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/updateUser").patch(updateUser)


//export the router
module.exports = router