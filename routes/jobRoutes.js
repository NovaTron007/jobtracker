const express = require("express")
const router = express.Router()
const { createJob, getAllJobs, updateJob, deleteJob, showStats } = require("../controllers/jobController") // load controllers for routes to call

// create & get jobs
router.route("/")
      .post(createJob)
      .get(getAllJobs)

// using :id
router.route("/:id")
      .patch(updateJob)
      .delete(deleteJob)

// show stats
router.route("/stats").get(showStats)


//export the router
module.exports = router