import { Schema } from 'mongoose'
import { randomUUID } from "node:crypto";

// const collection = "users";

export const usersSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, default: "(not applicable)" },
    first_name: { type: String, required: true },
    last_name: { type: String, default: "(not specified)" },
    age: { type: Number, default: "(not specified)" },
    orders: {
      type: [
        {
          type: String,
          ref: "orders",
        },
      ],
      default: [],
    },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

// export const usersManager = mongoose.model(collection, schema);