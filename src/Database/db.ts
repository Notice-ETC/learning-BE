import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const mongoURL = process.env.MONGO_URL as string;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;