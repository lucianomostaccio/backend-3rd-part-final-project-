import { matches } from "../../utils.js";
import fs from 'fs/promises';

export class CartsDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readCarts() {
    try {
      return JSON.parse(await fs.readFile(this.path, 'utf-8'););
    } catch (error) {
      console.error("Error reading carts from file:", error);
      return [];
    }
  }

  async #writeCarts(carts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    } catch (error) {
      console.error("Error writing carts to file:", error);
    }
  }

  async create(dataPojo) {
    const carts = await this.#readCarts();
    carts.push(cartPojo);
    await this.#writeCarts(carts);
    return cartPojo;
  }

  async readOne(query) {
    const carts = await this.#readCarts();
    const searched = carts.find(matches(query));
    return searched;
    // return carts.find(cart => cart._id === query._id);
  }

  async readMany(query) {
    const carts = await this.#readCarts();
    const manySearched = carts.filter(matches(query));
    return manySearched;
  }

  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED');
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED');
  }

  async deleteOne(query) {
    throw new Error('NOT IMPLEMENTED');
  }

  async deleteMany(query) {
    throw new Error('NOT IMPLEMENTED');
  }
}