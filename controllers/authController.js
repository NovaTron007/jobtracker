const User = require("../models/User")


exports.register = async (req, res, next) => {
    try {
        // create user
        const user = await User.create(req.body)
        // response
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        // pass to error middleware
        next(err)
    }
}

exports.login = (req, res) => {
    res.send("login user")
}

exports.updateUser = (req, res) => {
    res.send("update user")
}