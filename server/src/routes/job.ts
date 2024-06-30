import express from "express";
import passport from "passport";
import { jwtStrategy } from "../middlewares/auth";
import { createJob, updateJob, deleteJob, getJobs } from "../controllers/job";

const router = express.Router();

passport.use(jwtStrategy);

router.post("/", passport.authenticate("jwt", { session: false }), createJob);
router.put("/:id", passport.authenticate("jwt", { session: false }), updateJob);
router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteJob);
router.get("/", getJobs);

export default router;