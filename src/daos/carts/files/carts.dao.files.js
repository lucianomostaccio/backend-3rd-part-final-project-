import { matches } from "../../utils.js";
import fs from 'fs/promises';

export class CartsDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readCarts() {
    try {
      return JSON.parse(await fs.readFile(this.path, 'utf-8'));
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

  async create(cartPojo) {
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
    const carts = await this.#readCarts();
    const index = carts.findIndex(matches(query));
    if (index !== -1) {
      carts[index] = { ...carts[index], ...data };
      await this.#writeCarts(carts);
      return carts[index];
    }
    throw new Error("Cart not found");
  }

  async updateMany(query, data) {
    const carts = await this.#readCarts();
    const updatedCarts = carts.map(cart => {
      if (matches(query)(cart)) {
        return { ...cart, ...data };
      }
      return cart;
    });
    await this.#writeCarts(updatedCarts);
    return updatedCarts;
  }


  async deleteOne(query) {
    const carts = await this.#readCarts();
    const index = carts.findIndex(matches(query));
    if (index !== -1) {
      const deletedCart = carts.splice(index, 1)[0];
      await this.#writeCarts(carts);
      return deletedCart;
    }
    throw new Error("Cart not found");
  }

  async deleteMany(query) {
    const carts = await this.#readCarts();
    const remainingCarts = carts.filter(cart => !matches(query)(cart));
    const deletedCarts = carts.filter(cart => matches(query)(cart));
    await this.#writeCarts(remainingCarts);
    return deletedCarts;
  }
}