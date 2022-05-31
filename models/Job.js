import mongoose from "mongoose"

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide a company"],
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    position: {
        type: String,
        required: [true, "Please provide a position"],
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "freelance", "remote"],
        default: "full-time"
    },
    jobLocation: {
        type: String,
        default: "Hong Kong",
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"]
    }
},
{timestamps: true}
)

// set up model in db
export default mongoose.model("Job", JobSchema)
