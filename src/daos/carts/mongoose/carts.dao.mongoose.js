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
    const updatedCart = await this.cartsModel.findOneAndUpdate(query, data, { new: true }).lean();
    if (!updatedCart) {
      throw new Error("Cart not found");
    }
    return toPOJO(updatedCart);
  }

  async updateMany(query, data) {
    const updatedCarts = await this.cartsModel.updateMany(query, data, { new: true }).lean();
    if (!updatedCarts) {
      throw new Error("No carts found to update");
    }
    return updatedCarts;
  }

  async deleteOne(query) {
    const deletedCart = await this.cartsModel.findOneAndDelete(query).lean();
    if (!deletedCart) {
      throw new Error("Cart not found");
    }
    return toPOJO(deletedCart);
  }

  async deleteMany(query) {
    const deletedCarts = await this.cartsModel.deleteMany(query).lean();
    if (!deletedCarts) {
      throw new Error("No carts found to delete");
    }
    return deletedCarts;
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
