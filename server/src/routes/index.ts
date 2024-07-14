import { Application, Request, Response, NextFunction } from "express";
import JobsRoutes from "./jobs.routes";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../errors/ApiError";
import UserManagementRoutes from "./users.routes";
import AuthRoutes from "./auth.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/auth", new AuthRoutes().router);
    app.use("/api/v1/jobs", new JobsRoutes().router);
    app.use("/api/v1/users", new UserManagementRoutes().router);
    app.get("/", (req: Request, res: Response) => {
      res.status(StatusCodes.OK).send(`⚡️[Server]: Server is running!`);
    });

    app.get("/health", (req: Request, res: Response) => {
      res.status(StatusCodes.OK).send(`⚡️[Server]: Server is running!`);
    });

    app.use("*", (req: Request, res: Response, next: NextFunction) => {
      const error = new ApiError(
        StatusCodes.NOT_FOUND,
        `🔍[Server]: Route not found: ${req.originalUrl}`
      );
      next(error);
    });
  }
}