import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const mongoURL = process.env.MONGO_URL

if (!mongoURL) {
  throw new Error('MONGO_URL environment variable is not defined')
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  }
}

export default connectDB
