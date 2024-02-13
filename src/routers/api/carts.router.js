import { Router } from "express";
import { postController } from '../../controllers/carts.controller.js'

export const cartsRouter = Router();

cartsRouter.post("/", postController);
// cartsRouter.post("/:cid/carts", postCartsController);
