import { Router, json, urlencoded } from "express";
import { sessionsRouter } from "./sessions.router.js";
import { usersRouter } from "./users.router.js";
import { improvedReplies } from "../../middlewares/improvedReplies.js";
import { errorsHandler } from "../../middlewares/errorsHandler.js";

export const apiRouter = Router();

apiRouter.use(urlencoded({ extended: true }))

apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.use(improvedReplies);
apiRouter.use(errorsHandler);

// apiRouter.use(json());
// apiRouter.use(urlencoded({ extended: true }));