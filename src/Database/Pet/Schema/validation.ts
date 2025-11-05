import { PetType, PetStatus } from './type'

export interface ICreatePetInput {
  name: string
  type: PetType
  breed: string
  status?: PetStatus
  birthDate?: Date | string | null
  imageUrl?: string
  owner?: string | null
}

export interface IUpdatePetInput {
  name?: string
  type?: PetType
  breed?: string
  status?: PetStatus
  birthDate?: Date | string | null
  imageUrl?: string
  owner?: string | null
}

export const validateCreatePetInput = (data: unknown): data is ICreatePetInput => {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const pet = data as Record<string, unknown>

  // name, type, และ breed เป็น required
  if (typeof pet.name !== 'string' || typeof pet.breed !== 'string') {
    return false
  }

  // type เป็น required และต้องเป็น PetType ที่ valid
  if (typeof pet.type !== 'string' || !Object.values(PetType).includes(pet.type as PetType)) {
    return false
  }

  // status เป็น optional แต่ถ้ามีต้องเป็น PetStatus ที่ valid
  if (pet.status !== undefined) {
    if (
      typeof pet.status !== 'string' ||
      !Object.values(PetStatus).includes(pet.status as PetStatus)
    ) {
      return false
    }
  }

  // birthDate เป็น optional
  if (pet.birthDate !== undefined && pet.birthDate !== null) {
    if (typeof pet.birthDate !== 'string' && !(pet.birthDate instanceof Date)) {
      return false
    }
  }

  // imageUrl เป็น optional แต่ถ้ามีต้องเป็น string
  if (pet.imageUrl !== undefined && typeof pet.imageUrl !== 'string') {
    return false
  }

  // owner เป็น optional แต่ถ้ามีต้องเป็น string หรือ null
  if (pet.owner !== undefined && pet.owner !== null && typeof pet.owner !== 'string') {
    return false
  }

  return true
}

export const validateUpdatePetInput = (data: unknown): data is IUpdatePetInput => {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const pet = data as Record<string, unknown>

  // ทุก field เป็น optional แต่ถ้ามีต้อง validate

  // name เป็น optional แต่ถ้ามีต้องเป็น string
  if (pet.name !== undefined && typeof pet.name !== 'string') {
    return false
  }

  // type เป็น optional แต่ถ้ามีต้องเป็น PetType ที่ valid
  if (pet.type !== undefined) {
    if (typeof pet.type !== 'string' || !Object.values(PetType).includes(pet.type as PetType)) {
      return false
    }
  }

  // breed เป็น optional แต่ถ้ามีต้องเป็น string
  if (pet.breed !== undefined && typeof pet.breed !== 'string') {
    return false
  }

  // status เป็น optional แต่ถ้ามีต้องเป็น PetStatus ที่ valid
  if (pet.status !== undefined) {
    if (
      typeof pet.status !== 'string' ||
      !Object.values(PetStatus).includes(pet.status as PetStatus)
    ) {
      return false
    }
  }

  // birthDate เป็น optional
  if (pet.birthDate !== undefined && pet.birthDate !== null) {
    if (typeof pet.birthDate !== 'string' && !(pet.birthDate instanceof Date)) {
      return false
    }
  }

  // imageUrl เป็น optional แต่ถ้ามีต้องเป็น string
  if (pet.imageUrl !== undefined && typeof pet.imageUrl !== 'string') {
    return false
  }

  // owner เป็น optional แต่ถ้ามีต้องเป็น string หรือ null
  if (pet.owner !== undefined && pet.owner !== null && typeof pet.owner !== 'string') {
    return false
  }

  return true
}
