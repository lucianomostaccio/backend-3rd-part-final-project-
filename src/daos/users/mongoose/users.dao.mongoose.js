import mongoose from "mongoose";

export class UsersDaoMongoose {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async create(data) {
    const user = await usersModel.create(data);
    return toPOJO(user);
  }

  async readOne(query) {
    return toPOJO(await this.usersModel.findOne(query).lean());
  }

  async readMany(query) {
    return toPOJO(await this.usersModel.find(query).lean());
  }

  async updateOne(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteOne(query) {
    return toPOJO(await this.usersModel.findOneAndDelete(query).lean());
  }

  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
}

// let productsDaoMongoose;
// console.log("using mongodb persistence - users");

// export async function getDaoMongoose() {
//   if (!productsDaoMongoose) {
//     await connect(MONGODB_CNX_STR);
//     console.log("connected to mongodb");
//     productsDaoMongoose = new UsersDaoMongoose();
//   }
//   return productsDaoMongoose;
// }
