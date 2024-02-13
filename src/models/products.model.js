import { randomUUID } from "node:crypto";

export class Product {
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

  toPOJO() {
    return {
      _id: this.#_id,
      name: this.#name,
      price: this.#price,
    };
  }
}