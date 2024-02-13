import fs from 'fs/promises';
import { matches } from "../../utils.js";

export class OrdersDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readOrders() {
    try {
      return JSON.parse(await fs.readFile(this.path, 'utf-8'));
    } catch (error) {
      console.error("Error reading orders from file:", error);
      return [];
    }
  }

  async #writeOrders(orders) {
    try {
      await fs.writeFile(this.path, JSON.stringify(orders, null, 2));
    } catch (error) {
      console.error("Error writing orders to file:", error);
    }
  }

  async create(orderPojo) {
    const orders = await this.#readOrders();
    orders.push(orderPojo)
    await this.#writeOrders(orders);
    return orderPojo
  }

  async readOne(query) {
    const orders = await this.#readOrders();
    const searched = orders.find(matches(query));
    return searched;
    // return orders.find(order => order._id === query._id);
  }

  async readMany(query) {
    const orders = await this.#readOrders();
    const manySearched = orders.filter(matches(query));
    return orders;
  }

  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED');
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED');
  }

  async deleteOne(query) {
    const orders = await this.#readOrders();
    const indexSearched = orders.findIndex(matches(query));
    if (indexSearched !== -1) {
      const [searched] = orders.splice(indexSearched, 1);
      await this.#writeOrders(orders);
      return searched;
    }
    return null;
  }

  async deleteMany(query) {
    throw new Error('NOT IMPLEMENTED');
  }
}