import { Schema } from "mongoose";
import { randomUUID } from "node:crypto";

// const cartCollection = "carts";

export const cartSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    products: [
      {
        _id: { type: String, default: randomUUID },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

// const CartModel = mongoose.model(cartCollection, cartSchema);

// export default = CartModel;
