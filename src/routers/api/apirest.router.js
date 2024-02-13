import { Router, json, urlencoded } from "express";
import { productsRouter } from "./products.router.js";
import { cartsRouter } from "./carts.router.js";
import { sessionsRouter } from "./sessions.router.js";
import { usersRouter } from "./users.router.js";
import { improvedReplies } from "../../middlewares/improvedReplies.js";
import { errorsHandler } from "../../middlewares/errorsHandler.js";

export const apiRouter = Router();

apiRouter.use(improvedReplies);
apiRouter.use(errorsHandler);

apiRouter.use(json());
apiRouter.use(urlencoded({ extended: true }));

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);

// apiRouter.use(json());
// apiRouter.use(urlencoded({ extended: true }));
