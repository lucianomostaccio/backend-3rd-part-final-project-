import mongoose from "mongoose";
import { randomUUID } from 'node:crypto'

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  products: [
    {
      _id: { type: String, default: randomUUID },
      quantity: { type: Number, required: true },
    },
  ],
});

const CartModel = moongose.model(cartCollection, cartSchema);


module.exports = CartModel;
