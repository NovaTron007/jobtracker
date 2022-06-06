import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import { CustomErrorMessage } from "../errors/index.js"


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

export const updateJob = (req, res) => {
    res.send("update user")
}

export const deleteJob = (req, res) => {
    res.send("delete job")
}

export const showStats = (req, res) => {
    res.send("show stats")
}