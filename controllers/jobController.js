import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import { CustomErrorMessage } from "../errors/index.js"
import checkPermission from "../utils/checkPermission.js"


export const createJob = async (req, res) => {
    // get req.body
    const { position, company } = req.body
    // use custom errors: add message to js Error object before errorHandlerMiddleware response
    if(!position || !company) {
        throw new CustomErrorMessage("Please complete all fields!", StatusCodes.BAD_REQUEST)
    }
    // add user from req.body from req.user
    req.body.createdBy = req.user.userId
    // insert into db
    const job = await Job.create(req.body)
    // response
    res.status(StatusCodes.CREATED).json({
        success: true,
        job: job
    })

}

export const getAllJobs = async (req, res) => {
    // find job by user
    const jobs = await Job.find({createdBy: req.user.userId})
    if(!jobs) {
        throw new CustomErrorMessage("No jobs found with that user.", StatusCodes.BAD_REQUEST)
    }
    // response 
    res.status(StatusCodes.OK).json({
        success: true, 
        jobs,
        totalJobs: jobs.length,
        totalPages: 1
    })
}

export const updateJob = async (req, res) => {
    // get params
    const { id } = req.params // req.params.id
    // get body
    const { company, position } = req.body
    // blank fields
    if(!company || !position) {
        throw new CustomErrorMessage("Please provide all values!", StatusCodes.BAD_REQUEST)
    }
    // check job with id in model exists
    const job = await Job.findOne({_id: id}) // model id with job id passed in req
    // no job
    if(!job) {
        throw new CustomErrorMessage(`No job found with id: ${id}`, StatusCodes.BAD_REQUEST)
    }
    // check permission (owner can only update)
    checkPermission(req.user, job.createdBy)
    // find and update
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true, 
        runValidators: true // run error object with mongoose errors
    })
    // response
    res.status(StatusCodes.OK).json({
        success: true,
        updatedJob
    })
}

export const deleteJob = async (req, res) => {
    // get params
    const id = req.params.id
    // check job with id in model exists
    const job = await Job.findOne({_id: id}) // model id with job id passed in req
    // no job
    if(!job) {
        throw new CustomErrorMessage(`No job found with id: ${id}`, StatusCodes.BAD_REQUEST)
    }
    // check permission (owner can only delete)
    checkPermission(req.user, job.createdBy)
    // delete
    await Job.remove(job)
    // response
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Job deleted!"
    })
}

export const showStats = (req, res) => {
    res.send("show stats")
}