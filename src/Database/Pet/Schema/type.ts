import { Document } from 'mongoose'

export enum PetType {
  DOG = 'dog',
  CAT = 'cat',
  BIRD = 'bird',
  RABBIT = 'rabbit',
  FISH = 'fish',
  OTHER = 'other',
}

export enum PetStatus {
  AVAILABLE = 'available',
  ADOPTED = 'adopted',
  SICK = 'sick',
  LOST = 'lost',
  DECEASED = 'deceased',
}

export interface IPetSchema {
  id: string
  name: string
  type: PetType
  breed: string
  status: PetStatus
  birthDate: Date | null
  imageUrl: string
  owner: string | null
}

export interface IPet extends Document {
  id: string
  name: string
  type: PetType
  breed: string
  status: PetStatus
  birthDate: Date | null
  imageUrl: string
  owner: string | null
  createdAt: Date
  updatedAt: Date
}
