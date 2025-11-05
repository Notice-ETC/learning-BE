import mongoose, { Schema } from 'mongoose'
import shortid from 'shortid'
import dayjs from 'dayjs'
import { IPet, PetType, PetStatus } from './type'

const PetSchema: Schema = new Schema<IPet>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => shortid.generate(),
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(PetType),
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PetStatus),
      required: true,
      default: PetStatus.AVAILABLE,
    },
    birthDate: {
      type: Date,
      default: null,
      validate: {
        validator: function (value: Date | null): boolean {
          if (value === null) {
            return true
          }
          return dayjs(value).isValid() && dayjs(value).isBefore(dayjs())
        },
        message: 'Invalid birth date (must be in the past)',
      },
    },
    imageUrl: {
      type: String,
      required: true,
      default: () => {
        const width = 400
        const height = 400
        const randomId = Math.floor(Math.random() * 1000)
        return `https://picsum.photos/seed/${randomId}/${width}/${height}`
      },
    },
    owner: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

const Pet = mongoose.model<IPet>('Pet', PetSchema)

export default Pet
export { PetType, PetStatus }
export type { IPet } from './type'
export type { IPetSchema } from './type'
