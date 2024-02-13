import { toPOJO } from "../../utils.js";

export class ProductsDaoMongoose {
  constructor(productsModel) {
    this.productsModel = productsModel;
  }

  async create(data) {
    const product = await this.productsModel.create(data);
    return toPOJO(product);
  }

  async readOne(query) {
    return await productsModel.findOne(query).lean();
    return toPOJO(product);
  }

  async readMany(query) {
    return toPOJO(await this.productsModel.find(query).lean());
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

//   let productsDaoMongoose;
//   console.log("using mongodb persistence - products");

//   export async function getDaoMongoose() {
//     if (!productsDaoMongoose) {
//       await connect(MONGODB_CNX_STR);
//       console.log("connected to mongodb");
//       productsDaoMongoose = new ProductsDaoMongoose();
//     }
//     return productsDaoMongoose;
//   }
