import { EXECUTION_MODE } from "../../config/config.js";

let getDaoOrders;

if (EXECUTION_MODE === "online") {
  const { getDaoMongoose } = await import("./orders.dao.mongoose.js");
  getDaoOrders = getDaoMongoose;
} else {
  const { getDaoFiles } = await import("./orders.dao.files.js");
  getDaoOrders = getDaoFiles;
}

export { getDaoOrders };
