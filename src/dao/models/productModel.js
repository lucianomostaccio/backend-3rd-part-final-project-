const mongoose = require("mongoose");
const randomUUID = require("node:crypto");
const mongoosePaginate = require("mongoose-paginate-v2");

const productCollection = 'products'

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
