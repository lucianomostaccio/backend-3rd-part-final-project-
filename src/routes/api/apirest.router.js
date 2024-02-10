import { Router } from "express";
import { sessionsRouter } from "./sessions.router.js";
import { usersRouter } from "./users.router.js";

export const apiRouter = Router();

apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);
