export const createJob = (req, res) => {
    res.send("create job")
}

export const getAllJobs = (req, res) => {
    res.send("get all jobs")
}

export const updateJob = (req, res) => {
    console.log("req.user: ", req.user)
    res.send("update user")
}

export const deleteJob = (req, res) => {
    res.send("delete job")
}

export const showStats = (req, res) => {
    res.send("show stats")
}