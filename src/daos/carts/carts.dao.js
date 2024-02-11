import { EXECUTION_MODE } from "../../config/config.js";

let getDaoCarts;

if (EXECUTION_MODE === "online") {
  const { getDaoMongoose } = await import("./carts.dao.mongoose.js");
  getDaoCarts = getDaoMongoose;
} else {
  const { getDaoFiles } = await import("./carts.dao.files.js");
  getDaoCarts = getDaoFiles;
}

export { getDaoCarts };
