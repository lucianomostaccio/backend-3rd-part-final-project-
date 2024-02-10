const mongoose = require("mongoose");
const randomUUID = require("node:crypto");

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  products: [
    {
      _id: { type: String, default: randomUUID },
      quantity: { type: Number, required: true },
    },
  ],
});

const CartModel = mongoose.model(cartCollection, cartSchema);

module.exports = CartModel;
