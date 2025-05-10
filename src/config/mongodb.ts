import mongoose from 'mongoose'
import { env } from '~/config/environment'

const connectMongoDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_CONNECTION_STRING)
    console.log('Connect to MongoDB is successfully')
  } catch (error) {
    console.log('Connect to MongoDB failed', error)
  }
}

export default connectMongoDB
