import { toPOJO } from "../../utils.js";

export class OrdersDaoMongoose {
  constructor(ordersModel) {
    this.ordersModel = ordersModel;
  }

  async create(data) {
    const order = await this.ordersModel.create(data);
    return toPOJO(order);
  }

  async readOne(query) {
    return toPOJO(await this.ordersModel.findOne(query).lean());
  }

  async readMany(query) {
    return toPOJO(await this.ordersModel.find(query).lean());
  }

  async updateOne(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteOne(query) {
    return toPOJO(await this.ordersModel.findOneAndDelete(query).lean());
  }

  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
}

// let productsDaoMongoose;
// console.log("using mongodb persistence - orders");

// export async function getDaoMongoose() {
//   if (!productsDaoMongoose) {
//     await connect(MONGODB_CNX_STR);
//     console.log("connected to mongodb");
//     productsDaoMongoose = new UsersDaoMongoose();
//   }
//   return productsDaoMongoose;
// }
