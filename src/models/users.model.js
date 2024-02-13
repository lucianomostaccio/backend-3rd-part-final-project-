import { randomUUID } from 'node:crypto'

export class User {
    #_id;
    #name;
    constructor({ _id = randomUUID(), name }) {
      this.#_id = _id;
      this.name = name;
      this.email = email
    }
  
    get _id() {
      return this.#_id;
    }
    get name() {
      return this.#name;
    }

    get email() { return this.#email }
  
    set name(value) {
      if (!value) throw new Error("name is mandatory");
      this.#name = value;
    }

    set email(value) {
        if (!value) throw new Error('el email es obligatorio')
        this.#email = value
      }
  
    toPOJO() {
      return {
        _id: this.#_id,
        name: this.#name,
        email: this.#email,
      };
    }
  }