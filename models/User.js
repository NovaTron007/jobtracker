import mongoose from "mongoose"
import validator from "validator" // validator package
import bcrypt from "bcryptjs" // encrypt password
import jwt from "jsonwebtoken" // use jsonwebtoken

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
        default: null,
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
        minLength: 6,
        select: false // don't allow select query on it
    },
    location: {
        type: String,
        maxLength: 20,
        default: "Hong Kong",
        trim: true
    },
})

// pre: before saving document
UserSchema.pre("save", async function(){
    // console.log("modifiedPaths:", this.modifiedPaths())

    //update user: don't hash password twice
    if(!this.isModified("password")) return
    // use bcrypt to generate salt
    const salt = await bcrypt.genSalt(10)
    // hash password with salt
    this.password = await bcrypt.hash(this.password, salt)
})

// check password using bcrypt
UserSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password) // bcrypt compare method
    return isMatch
}

// instance method: create jwt instance method
UserSchema.methods.createJWT = function() {
    console.log(this) // log user
    return jwt.sign(
        {id: this._id}, // user id on model
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
}

// set up model in db
export default mongoose.model("User", UserSchema)
