import express from "express" // import express
import dotenv from "dotenv" // read env vars
import "express-async-errors" // try/catch removed
import cors from "cors" // enable req to to other servers
import morgan from "morgan" // log HTTP requests and errors, and simplifies the process. 
import cookieParser from "cookie-parser"
import notFoundMiddleware from "./middleware/notFoundMiddleware.js"
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"
import authenticateUser from "./middleware/authMiddleware.js" // auth middleware
import connectDB from "./config/dbConnect.js" // connect to mongodb
// security middlewares
import helmet from "helmet"; // remove, set headers to comply w/web security stds i.e x-powered
import xss from "xss-clean" // sanitize user input against xss
import mongoSanitize from "express-mongo-sanitize" // prevent mongoDB operator injection
// routes: import route files (calls controller)
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobRoutes.js"
// for deployment use nodejs 
import path from "path"; // manage file paths. Different operating systems manage file and directory-related operations differently
import { fileURLToPath } from "url" // encodes absolute paths cross platform 
import { dirname } from "path" // returns a directory name






// use express
const app = express()
// use dotenv (use path obj for specific folder)
dotenv.config({path: "./config/config.env"}) // load .env before other files that use them

// get root path using dirname and encoded path using file fileURLtoPath 
const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy get root directory name
app.use(express.static(path.resolve(__dirname, './client/build')));

// Parse json data sent from body
app.use(express.json())

// security middleware
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// allow cross origin requests
app.use(cors())

// can read cookies from request sent in by client
app.use(cookieParser())

// Routes: add prefixes to route files then use route file for endpoint
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", authenticateUser, jobsRouter)

// Custom Middleware
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
