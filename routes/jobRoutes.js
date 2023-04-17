import express from "express"
const router = express.Router()
import { createJob, getAllJobs, updateJob, deleteJob, showStats } from "../controllers/jobController.js" // load controllers for routes to call
import checkTestUser from "../middleware/checkTestUserMiddleware.js"

// create & get jobs
router.route("/")
      .post(checkTestUser, createJob)
      .get(getAllJobs)

// using :id
router.route("/:id")
      .patch(checkTestUser, updateJob)
      .delete(checkTestUser, deleteJob)

// show stats
router.route("/stats").get(showStats)


//export the router
export default router