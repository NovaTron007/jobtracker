const express = require("express") // import express
const dotenv =require("dotenv")
const notFoundMiddleware = require("./middleware/notFoundMiddleware")
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware")
const connectDB = require("./config/dbConnect") // connect to mongodb

// use express
const app = express()
// use dotenv (use path obj for specific folder)
dotenv.config({path: "./config/.env"}) // load .env before other files that use them


// routes
app.get("/", (req, res) => {
    throw new Error("error")
})

// Middlware
app.use(notFoundMiddleware) // run if no route exists
app.use(errorHandlerMiddleware) // show error messages

// PORT constant in env
const PORT = process.env.PORT || 5000

// connect to db
try {
    connectDB()
    app.listen(PORT, () => {
        console.log(`App running on port: ${PORT}`)
    })
} catch (err) {
    console.log("Error connecting to database: ", err)
}
