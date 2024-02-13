import { Schema } from 'mongoose'
import { randomUUID } from "node:crypto";
// import mongoosePaginate from "mongoose-paginate-v2";

// const productCollection = "products";

export const productsSchema = new Schema(
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

// productsSchema.plugin(mongoosePaginate);

// const ProductModel = mongoose.model(productCollection, productsSchema);

// export default = ProductModel;
