import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import { DEFAULT_USER_AVATAR_PATH } from "../../config/config.js";

const collection = "users";

const schema = new mongoose.Schema(
  {
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, default: "(not applicable)" },
    first_name: { type: String, required: true },
    last_name: { type: String, default: "(not specified)" },
    age: { type: Number, default: "(not specified)" },
    profile_picture: { type: String, default: DEFAULT_USER_AVATAR_PATH },
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

export const usersManager = mongoose.model(collection, schema);

class UsersDaoMongoose {
    async create(data) {
      const juguete = await usersModel.create(data)
      return juguete.toObject()
    }
  
    async readOne(query) {
      return await usersModel.findOne(query).lean()
    }
  
    async readMany(query) {
      return await usersModel.find(query).lean()
    }
  
    async updateOne(query, data) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async updateMany(query, data) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async deleteOne(query) {
      return await usersModel.findOneAndDelete(query).lean()
    }
  
    async deleteMany(query) {
      throw new Error('NOT IMPLEMENTED')
    }
  }
  
  let productsDaoMongoose
  console.log('using mongodb persistency')
  
  export async function getDaoMongoose() {
    if (!productsDaoMongoose) {
      await connect(MONGODB_CNX_STR)
      console.log('connected to mongodb')
      productsDaoMongoose = new UsersDaoMongoose()
    }
    return productsDaoMongoose
  }