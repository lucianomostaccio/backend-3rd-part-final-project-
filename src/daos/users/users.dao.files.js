//ver

import { randomUUID } from "node:crypto";
import fs from "fs/promises";
import { matches } from "../utils.js";

class User {
  #_id;
  #name;
  constructor({ _id = randomUUID(), name }) {
    this.#_id = _id;
    this.name = name;
  }

  get _id() {
    return this.#_id;
  }
  get name() {
    return this.#name;
  }

  set name(value) {
    if (!value) throw new Error("name is mandatory");
    this.#name = value;
  }

  toObject() {
    return {
      _id: this.#_id,
      name: this.#name,
    };
  }
}

class UsersDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readUsers() {
    return JSON.parse(await fs.readFile(this.path, "utf-8"));
  }

  async #writeUsers(users) {
    await fs.writeFile(this.path, JSON.stringify(users, null, 2));
  }

  async create(data) {
    const user = new User(data);
    const users = await this.#readUsers();
    users.push(user.toObject());
    await this.#writeUsers(users);
    return user.toObject();
  }

  async readOne(query) {
    const users = await this.#readUsers();
    const searched = users.find(matches(query));
    return searched;
  }

  async readMany(query) {
    const users = await this.#readUsers();
    const manySearched = users.filter(matches(query));
    return manySearched;
  }

  async updateOne(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteOne(query) {
    const users = await this.#readUsers();
    const indexSearched = users.findIndex(matches(query));
    if (indexSearched !== -1) {
      const [searched] = users.splice(indexSearched, 1);
      await this.#writeUsers(users);
      return searched;
    }
    return null;
  }

  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
}

const usersDaoFiles = new UsersDaoFiles("./db/users.json");
console.log("using files persistence");

export async function getDaoFiles() {
  return usersDaoFiles;
}