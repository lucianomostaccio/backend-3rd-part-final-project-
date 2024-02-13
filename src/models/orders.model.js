import { randomUUID } from 'node:crypto'

export class Order {
    #_id
    #code
    #orderDate
    #amount
    #purchaser
  
    constructor({ _id = randomUUID, code = [], amount, purchaser }) {
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
  
    toPOJO() {
      return {
        _id: this.#_id,
        code: this.#code,
        orderDate: this.#orderDate,
        amount: this.#amount,
        purchaser: this.#purchaser,
      };
    }
  }