import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productsSchema = new mongoose.Schema(
  {
    // Mongoose assigns ids automatically
    // id: { type: Number},
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String },
    price: { type: Number },
    status: { type: Boolean, default: true },
    stock: { type: Number },
    category: { type: String },
    thumbnails: [{ type: String }], //array of picture paths
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

productsSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model(productCollection, productsSchema);

module.exports = ProductModel;

class ProductsDaoMongoose {
  async create(data) {
    const product = await productsModel.create(data);
    return product.toObject();
  }

  async readOne(query) {
    return await productsModel.findOne(query).lean();
  }

  async readMany(query) {
    return await productsModel.find(query).lean();
  }

  async updateOne(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteOne(query) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
}

let productsDaoMongoose;
console.log("using mongodb persistence");

export async function getDaoMongoose() {
  if (!productsDaoMongoose) {
    await connect(MONGODB_CNX_STR);
    console.log("connected to mongodb");
    productsDaoMongoose = new ProductsDaoMongoose();
  }
  return productsDaoMongoose;
}
