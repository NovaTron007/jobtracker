import express from "express" // import express
import dotenv from "dotenv" // read env vars
import "express-async-errors" // try/catch removed
import cors from "cors" // enable req to to other servers
import morgan from "morgan" // log HTTP requests and errors, and simplifies the process. 
import notFoundMiddleware from "./middleware/notFoundMiddleware.js"
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"
import authenticateUser from "./middleware/auth.js" // auth middleware
import connectDB from "./config/dbConnect.js" // connect to mongodb

// use express
const app = express()
// use dotenv (use path obj for specific folder)
dotenv.config({path: "./config/.env"}) // load .env before other files that use them

// import route files (calls controller)
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobRoutes.js"

// Parse json data sent from body
app.use(express.json())

// allow cross origin requests
app.use(cors())

// Routes: prefix then use route file for endpoint
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", authenticateUser, jobsRouter)

// Middleware
app.use(notFoundMiddleware) // run if no route exists
app.use(errorHandlerMiddleware) // show error messages

// http logger middleware: check environment to log errors in development mode 
if(process.env.NODE_ENV !== "production") {
    app.use(morgan("dev")) // dev colours
}

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
