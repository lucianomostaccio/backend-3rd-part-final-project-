import fs from "fs/promises";
import { Message } from "../../models/messagesModel.js";

export class MessagesManager {
  constructor(path) {
    this.path = path;
  }

  async create(data) {
    const message = new Message(data);
    const messages = JSON.parse(await fs.readFile(this.path, "utf-8"));
    messages.push(message);
    await fs.writeFile(this.path, JSON.stringify(messages, null, 2));
    return message;
  }

  async findAll() {
    const users = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return users;
  }
}

export const messagesManager = new MessagesManager("./db/messages.json");
