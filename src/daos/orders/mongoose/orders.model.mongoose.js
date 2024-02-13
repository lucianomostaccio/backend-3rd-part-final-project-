const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
