import { connect, model } from "mongoose";
import { EXECUTION_MODE } from "../../config/config.js";
import { MONGODB_CNX_STR } from "../../config/config.js";

import { CartsDaoMongoose } from "./mongoose/carts.dao.mongoose.js";
import { CartsDaoFiles } from "./files/carts.dao.files.js";
import { cartsSchema } from "./mongoose/carts.model.mongoose.js";
const PATH_CARTS_FILES = "./files/carts.dao.files.js";

let daoCarts;

if (EXECUTION_MODE === "online") {
  if (!daoCarts) {
    const cartsModel = model("carts", cartsSchema);
    daoCarts = new CartsDaoMongoose(cartsModel);
    console.log("using mongodb persistence - carts");
  }
  // const { getDaoMongoose } = await import(
  //   "./mongoose/carts.model.mongoose.js"
  // );
  // getDaoCarts = getDaoMongoose;
} else {
  daoCarts = new CartsDaoFiles(PATH_CARTS_FILES);
  console.log("using files persistence - carts");
  // getDaoCarts = getDaoFiles;
}

export function getDaoCarts() {
  return daoCarts;
}