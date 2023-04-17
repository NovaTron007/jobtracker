import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import { CustomErrorMessage } from "../errors/index.js"
import checkPermission from "../utils/checkPermission.js"
import mongoose from "mongoose"
import moment from "moment" // format date


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
    // Search Query: in url ie: /jobs?status=declined&jobType=full-time&search=media)
    const { status, jobType, sort, search } = req.query

    console.log("getAllJobs: ", req.user)
    
    // create and build up query obj
    const queryObj = { 
        createdBy: req.user.userId,
    }
    
    // Status: add to queryObj only if status in query params in url (avoid /jobs route error)
    if(status && status !== "all"){ 
        queryObj.status = status
    }

    // jobType: add to queryObj if jobType in query params in url (avoid /jobs route error)
    if(jobType && jobType !== "all") {
        queryObj.jobType = jobType
    }

    // Search term: add to queryObj
    if(search){
        // mongodb regex: where text exists in general (not exact match)
        queryObj.position = {$regex: search, $options: "i"} // term, case insensitive
    }

    // no await as it will get result immediately, (we want just query)
    let result = Job.find(queryObj)

    // sort options after result is retrieved
    if(sort === "latest"){
        result = result.sort("-createdAt")
    }
    if(sort === "oldest"){
        result = result.sort("createdAt")
    }
    if(sort === "a-z"){
        result = result.sort("position")
    }
    if(sort === "z-a"){
        result = result.sort("-position")
    }

    // pagination
    const page = Number(req.query.page) || 1 // get page param from url
    const limit = Number(req.query.limit) || 10 // total items to show
    const skip = (page - 1) * limit //  how many items to skip over ie (2 - 1) * 10 = skip 10 items for page 2
    
    // add to result 
    result = result.skip(skip).limit(limit)
        
    // chain sort conditions
    const jobs = await result

    // get total jobs: count documents instead of limit
    const totalJobs = await Job.countDocuments(queryObj)
    const totalPages = Math.ceil(totalJobs / limit) // ie: 30jobs / 10 per page = 3 pages

    // const jobs = await Job.find({createdBy: req.user.userId}) 
    if(!jobs) {
        throw new CustomErrorMessage("No jobs found with that user.", StatusCodes.BAD_REQUEST)
    }
    // response 
    res.status(StatusCodes.OK).json({
        success: true, 
        totalJobs,
        totalPages,
        jobs
    })
}

export const updateJob = async (req, res) => {
    // get params
    const { id } = req.params // req.params.id
    console.log("job id: ", id)
    console.log("job req.body: ", req.body)
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

// show stats: aggregate pipeline, get jobs by user createdBy, group and count each status values
export const showStats = async (req, res) => {
    console.log("showStats req.user: ", req.user)
    // returns array with objects in response
    let stats = await Job.aggregate([
        // match: mongodb operator (get all jobs by user)
        { 
            $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) }
        },
        // group by object: mongodb operator
        { 
            $group: { _id: "$status", count: {$sum: 1 } } // result: { "stats": [{ "_id": "interview", "count": 9 }, ..etc } rename id as status
        }
    ])
    // reduce stats into single object
    stats = stats.reduce((acc, item) => { 
        const { _id: status, count } = item // destructure and rename
        acc[status] = count // dynamac keys: set status as key name, it's value to count ie 9, so in object: declined: 9
        return acc
        // console.log(acc) = acc: { declined: 12, interview: 9, pending: 9 }
        // console.log(acc[status]) = 9        
    }, {})
    
    // create response object with default 0 if no job created from user
    const defaultStats = {
        pending: stats.pending || 0, // default to avoid error
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }
    // monthly applications
    let monthlyApplications = await Job.aggregate([
        // match: mongodb operator (get all jobs by user)
        {
            $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } // get jobs by user
        },
        // group by object: mongodb operator
        {
           $group: { 
               _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt"} }, // _id is the expression to use
               count: { $sum: 1 } // sum of jobs with same year & month
            }
        },
        // sort: mongodb operator (use the id's above: year and month objects)
        {
            $sort: {
                "_id.year": -1, "_id.month": -1 // -1 descending (get latest entries in db)
            }
        },
        {
            $limit: 6 // show last 6 records
        }
    ])
    
    // destructure and format date from _id object
    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: {year, month}, count} = item // id is nested object destructure again
        const date = moment().month(month-1).year(year-1).format("MMM Y") // mongodb months 1-12, moment months 0-11 (subtract 1 from mongo)
        return {date, count} // return date and count as object
    }).reverse() // oldest first for chart

    // response
    res.status(StatusCodes.OK).json({
        success: true, 
        defaultStats,
        monthlyApplications
    })
}