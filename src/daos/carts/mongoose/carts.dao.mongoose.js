import { toPOJO } from "../../utils.js";

export class CartsDaoMongoose {
  constructor(cartsModel) {
    this.cartsModel = cartsModel;
  }

  async create(data) {
    const cart = await this.cartsModel.create(data);
    return toPOJO(cart);
  }

  async readOne(query) {
    return await cartsModel.findOne(query).lean();
    return toPOJO(cart);
  }

  async readMany(query) {
    return toPOJO(await this.cartsModel.find(query).lean());
  }

  async updateOne(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteOne(query) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
}

//   let cartsDaoMongoose;
//   console.log("using mongodb persistence - carts");

//   export async function getDaoMongoose() {
//     if (!cartsDaoMongoose) {
//       await connect(MONGODB_CNX_STR);
//       console.log("connected to mongodb");
//       cartsDaoMongoose = new CartsDaoMongoose();
//     }
//     return cartsDaoMongoose;
//   }
