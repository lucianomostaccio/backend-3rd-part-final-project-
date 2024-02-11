//ver
import { randomUUID } from "node:crypto";
import fs from "fs/promises";
import { matches } from "../utils.js";

class Product {
  #_id;
  #name;
  #price;
  constructor({ _id = randomUUID(), name, price }) {
    this.#_id = _id;
    this.name = name;
    this.price = price;
  }

  get _id() {
    return this.#_id;
  }
  get name() {
    return this.#name;
  }
  get price() {
    return this.#price;
  }

  set name(value) {
    if (!value) throw new Error("name is mandatory");
    this.#name = value;
  }

  set price(value) {
    if (!value) throw new Error("price is mandatory");
    if (value <= 0) throw new Error("price must greater than 0");
    this.#price = value;
  }

  toObject() {
    return {
      _id: this.#_id,
      name: this.#name,
      price: this.#price,
    };
  }
}

class ProductsDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readProducts() {
    return JSON.parse(await fs.readFile(this.path, "utf-8"));
  }

  async #writeProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async create(data) {
    const product = new Product(data);
    const products = await this.#readProducts();
    products.push(product.toObject());
    await this.#writeProducts(products);
    return product.toObject();
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

const productsDaoFiles = new ProductsDaoFiles("./db/products.json");
console.log("using files persistence");

export async function getDaoFiles() {
  return productsDaoFiles;
}
