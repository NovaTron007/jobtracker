import { readFile } from "fs/promises" // modules way to read files
import dotenv from "dotenv" // use dotenv variables
dotenv.config({path: "./config/config.env"}) // load .env before other files that use them
import connectDB from "./config/dbConnect.js" // connect db
import Job from "./models/Job.js" // Job model

// to run: node seeder
const start = async () => {
    try {
        // use connection function to connect
        await connectDB()
        // delete all jobs
        await Job.deleteMany()
        // file to use, meta url syntax to use for upload json (mock data createdBy: add user id in file )
        const jsonProducts = JSON.parse(await readFile(new URL("./mock_data.json", import.meta.url)))
        // add json file using create
        await Job.create(jsonProducts)
        // log and exit
         console.log("Seeded data successfully")
         process.exit(0)
    } catch(err) {
        console.log("err connecting: ", err)
        process.exit(1)
    }
}

// seed data
start()