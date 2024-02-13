import fs from "fs/promises";
import { matches } from "../../utils.js";

export class UsersDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readUsers() {
    return JSON.parse(await fs.readFile(this.path, "utf-8"));
  }

  async #writeUsers(users) {
    await fs.writeFile(this.path, JSON.stringify(users, null, 2));
  }

  async create(userPojo) {
    const users = await this.#readUsers();
    users.push(userPojo);
    await this.#writeUsers(users);
    return userPojo
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

