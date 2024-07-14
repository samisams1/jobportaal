import { Router } from "express";
import { asyncWrapper } from "../helpers/async-wrapper";
import {JobsController} from '../controllers/jobs.controller';
export default class JobsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.get("/", asyncWrapper(JobsController.getAllJobs));
    this.router.post("/", asyncWrapper(JobsController.createJob));
    this.router.get("/:id", asyncWrapper(JobsController.getJobById));
    this.router.put("/:id", asyncWrapper(JobsController.updateJob));
    this.router.delete("/:id", asyncWrapper(JobsController.deleteJob));
  }
}