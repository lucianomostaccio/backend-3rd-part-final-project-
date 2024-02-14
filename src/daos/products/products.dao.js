import { connect, model } from "mongoose";
import { EXECUTION_MODE } from "../../config/config.js";
import { MONGODB_CNX_STR } from "../../config/config.js";

import { ProductsDaoMongoose } from "./mongoose/products.dao.mongoose.js";
import { ProductsDaoFiles } from "./files/products.dao.files.js";
import { productsSchema } from "./mongoose/products.model.mongoose.js";
const PATH_PRODUCTS_FILES = "../../../db/products.json";

let daoProducts;

if (EXECUTION_MODE === "online") {
  if (!daoProducts) {
    const productsModel = model("products", productsSchema);
    daoProducts = new ProductsDaoMongoose(productsModel);
    console.log("using mongodb persistence - products");
  }
  // const { getDaoMongoose } = await import(
  //   "./mongoose/products.model.mongoose.js"
  // );
  // getDaoProducts = getDaoMongoose;
} else {
  daoProducts = new ProductsDaoFiles(PATH_PRODUCTS_FILES);
  console.log("using files persistence - products");
  // getDaoProducts = getDaoFiles;
}

export function getDaoProducts() {
  return daoProducts;
}
