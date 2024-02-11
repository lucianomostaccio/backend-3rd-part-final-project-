import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

class Order {
  #_id
  #code
  #orderDate
  #amount
  #purchaser

  constructor({ _id = uuidv4(), code = [], amount, purchaser }) {
    this.#_id = _id;
    this.#code = code;
    this.#orderDate = new Date();
    this.#amount = amount;
    this.#purchaser = purchaser;
  }

  get _id() { return this.#_id; }
  get code() { return this.#code; }
  get orderDate() { return this.#orderDate; }
  get amount() { return this.#amount; }
  get purchaser() { return this.#purchaser; }

  toObject() {
    return {
      _id: this.#_id,
      code: this.#code,
      orderDate: this.#orderDate,
      amount: this.#amount,
      purchaser: this.#purchaser,
    };
  }
}

class OrdersDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readOrders() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
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

  async create(data) {
    const order = new Order(data);
    const orders = await this.#readOrders();
    orders.push(order.toObject());
    await this.#writeOrders(orders);
    return order.toObject();
  }

  async readOne(query) {
    const orders = await this.#readOrders();
    return orders.find(order => order._id === query._id);
  }

  async readMany(query) {
    const orders = await this.#readOrders();
    return orders;
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

const ordersDaoFiles = new OrdersDaoFiles('./db/orders.json');
console.log('Using files persistence for orders.');

export async function getDaoFiles() {
  return ordersDaoFiles;
}