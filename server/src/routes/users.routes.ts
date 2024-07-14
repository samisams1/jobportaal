import { Router } from "express";
import { asyncWrapper } from "../helpers/async-wrapper";
import UserController from "../controllers/users.controller";

export default class UserManagementRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("/", asyncWrapper(UserController.getUsers));
    this.router.get("/:id", asyncWrapper(UserController.getUserById));
    this.router.put("/:id", asyncWrapper(UserController.updateUser));
  }
}
