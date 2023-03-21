import express from "express"
const router = express.Router()
import { createJob, getAllJobs, updateJob, deleteJob, showStats } from "../controllers/jobController.js" // load controllers for routes to call
import authenticateUser from "../middleware/auth.js"
import checkTestUser from "../middleware/checkTestUserMiddleware.js"

// create & get jobs
router.route("/")
      .post(authenticateUser, checkTestUser, createJob)
      .get(getAllJobs)

// using :id
router.route("/:id")
      .patch(authenticateUser, checkTestUser, updateJob)
      .delete(authenticateUser, checkTestUser, deleteJob)

// show stats
router.route("/stats").get(showStats)


//export the router
export default router