import { Router } from "express";
import {
  postController,
  getController,
  putController,
  deleteController,
} from "../controllers/carts.controller.js";

import { createOrder } from "../controllers/orders.controller.js";

export const cartsRouter = Router();

cartsRouter.post("/", postController);

cartsRouter.get("/:cartId", getController);

cartsRouter.put("/:cartId", putController);

cartsRouter.delete("/:cartId", deleteController);

cartsRouter.post("/api/orders", createOrder);
