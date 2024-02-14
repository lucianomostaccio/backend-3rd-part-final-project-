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
    const products = await this.productsModel.findOne(query).lean();
    return toPOJO(products);
  }

  async readMany(query) {
    return toPOJO(await this.productsModel.find(query).lean());
  }

  async updateOne(query, data) {
    const updatedProduct = await this.productsModel
      .findOneAndUpdate(query, data, { new: true })
      .lean();
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return toPOJO(updatedProduct);
  }

  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteOne(query) {
    const deletedProduct = await this.productsModel
      .findOneAndDelete(query)
      .lean();
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return toPOJO(deletedProduct);
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
