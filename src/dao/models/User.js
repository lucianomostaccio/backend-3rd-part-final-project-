import mongoose from "mongoose"
import { randomUUID } from "node:crypto"
import { DEFAULT_USER_AVATAR_PATH } from '../../config/config.js'

const collection = 'users'

const schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true, required: true },
  password : { type: String, default: '(not applicable)' },
  first_name: { type: String, required: true },
  last_name: { type: String, default: '(not specified)' },
  age : { type: Number, default: '(not specified)' },
  profile_picture: { type: String, default: DEFAULT_USER_AVATAR_PATH },
}, {
  strict: 'throw',
  versionKey: false
})

export const usersManager = mongoose.model(collection, schema)