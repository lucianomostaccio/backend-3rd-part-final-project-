import { Router } from "express";
import {
  postController,
  getController,
  putController,
  deleteController,
} from "../../controllers/carts.controller.js";

export const cartsRouter = Router();

cartsRouter.post("/", postController);

cartsRouter.get("/:cartId", getController);

cartsRouter.put("/:cartId", putController);

cartsRouter.delete("/:cartId", deleteController);
