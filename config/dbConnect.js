import mongoose from "mongoose"


// connect to db using mongo atlas creds: async as mongoose connect returns a promise
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // mongoose
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.log("Error connecting to database: ", err)
    }

}

export default connectDB