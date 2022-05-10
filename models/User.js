import mongoose from "mongoose"
import validator from "validator" // validator package


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    lastName: {
        type: String,
        maxLength: 20,
        default: "",
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validate: { // use validator package
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 6
    },
    location: {
        type: String,
        maxLength: 20,
        default: "Hong Kong",
        trim: true
    },
})


// set up model in db
export default mongoose.model("User", UserSchema)
