import { connect, model } from "mongoose";
import { EXECUTION_MODE } from "../../config/config.js";
import { MONGODB_CNX_STR } from "../../config/config.js";

import { OrdersDaoMongoose } from "./mongoose/orders.dao.mongoose.js";
import { OrdersDaoFiles } from "./files/orders.dao.files.js";
import { ordersSchema } from "./mongoose/orders.model.mongoose.js";
const PATH_ORDERS_FILES = "./files/orders.dao.files.js";

let daoOrders;

if (EXECUTION_MODE === "online") {
    if(!daoOrders) {
      const ordersModel = model('orders', ordersSchema)
      daoOrders = new OrdersDaoMongoose(ordersModel)
      console.log('using mongodb persistence - orders')
    }
    // const { getDaoMongoose } = await import("./mongoose/orders.dao.mongoose.js");
    // getDaoOrders = getDaoMongoose;
  } else {
    daoOrders = new OrdersDaoFiles(PATH_USERS_FILES)
    console.log('using files persistence - orders')
  }
  
  export function getDaoOrders() {
    return daoOrders
  } 