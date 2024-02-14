import { Schema } from 'mongoose'
// import { randomUUID } from "node:crypto";

export const ordersSchema = new Schema({
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