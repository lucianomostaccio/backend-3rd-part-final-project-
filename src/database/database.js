import { connect as connectToMongoose } from 'mongoose'
import { EXECUTION_MODE, MONGODB_CNX_STR } from '../config/config.js'

export async function connect() {
  if (EXECUTION_MODE === 'online') {
    await connectToMongoose(MONGODB_CNX_STR)
    console.log('conectado a mongodb')
  } else {
    console.log('trabajando con persistencia local')
  }
}