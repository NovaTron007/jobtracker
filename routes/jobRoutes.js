import express from "express"
const router = express.Router()
import { createJob, getAllJobs, updateJob, deleteJob, showStats } from "../controllers/jobController.js" // load controllers for routes to call

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
export default router