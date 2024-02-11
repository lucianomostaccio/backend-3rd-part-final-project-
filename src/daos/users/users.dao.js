import { EXECUTION_MODE } from "../../config/config.js";

let getDaoUsers;

if (EXECUTION_MODE === "online") {
  const { getDaoMongoose } = await import("./users.dao.mongoose.js");
  getDaoUsers = getDaoMongoose;
} else {
  const { getDaoFiles } = await import("./users.dao.files.js");
  getDaoUsers = getDaoFiles;
}

export { getDaoUsers };
