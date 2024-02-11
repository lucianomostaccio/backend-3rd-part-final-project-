import { EXECUTION_MODE } from "../../config/config.js";

let getDaoProducts;

if (EXECUTION_MODE === "online") {
  const { getDaoMongoose } = await import("./products.dao.mongoose.js");
  getDaoProducts = getDaoMongoose;
} else {
  const { getDaoFiles } = await import("./products.dao.files.js");
  getDaoProducts = getDaoFiles;
}

export { getDaoProducts };
