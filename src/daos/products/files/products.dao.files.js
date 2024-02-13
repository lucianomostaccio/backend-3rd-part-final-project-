import fs from "fs/promises";
import { matches } from "../../utils.js";

export class ProductsDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readProducts() {
    return JSON.parse(await fs.readFile(this.path, "utf-8"));
  }

  async #writeProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async create(productPojo) {
    const products = await this.#readProducts();
    products.push(productPojo);
    await this.#writeProducts(products);
    return productPojo;
  }

  async readOne(query) {
    const products = await this.#readProducts();
    const searched = products.find(matches(query));
    return searched;
  }

  async readMany(query) {
    const products = await this.#readProducts();
    const manySearched = products.filter(matches(query));
    return manySearched;
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
