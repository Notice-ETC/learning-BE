import mongoose, { Schema, Document } from 'mongoose'

export interface ITestDB extends Document {
  name: string
  createdAt: Date
}

const TestDBSchema: Schema = new Schema<ITestDB>({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const TestDB = mongoose.model<ITestDB>('TestDB', TestDBSchema)
export default TestDB
