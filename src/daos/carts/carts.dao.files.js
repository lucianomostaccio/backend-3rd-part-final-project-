import { randomUUID } from 'node:crypto';
import fs from 'fs/promises';

class Cart {
  #_id
  #products

  constructor({ _id = randomUUID(), products = [] }) {
    this.#_id = _id;
    this.#products = products;
  }

  get _id() { return this.#_id; }
  get products() { return this.#products; }

  toObject() {
    return {
      _id: this.#_id,
      products: this.#products,
    };
  }
}

class CartsDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
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

  async create(data) {
    const cart = new Cart(data);
    const carts = await this.#readCarts();
    carts.push(cart.toObject());
    await this.#writeCarts(carts);
    return cart.toObject();
  }

  async readOne(query) {
    const carts = await this.#readCarts();
    return carts.find(cart => cart._id === query._id);
  }

  async readMany(query) {
    const carts = await this.#readCarts();
    return carts;
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

const cartsDaoFiles = new CartsDaoFiles('./db/carts.json');
console.log('Using files persistence for carts.');

export async function getCartsDaoFiles() {
  return cartsDaoFiles;
}
