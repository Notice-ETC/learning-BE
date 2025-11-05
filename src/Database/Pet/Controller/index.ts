import type { Request, Response } from 'express'
import Pet from '../Pet'
import {
  validateCreatePetInput,
  validateUpdatePetInput,
  ICreatePetInput,
  IUpdatePetInput,
} from '../Schema/validation'
import { PetStatus } from '../Schema/type'
import dayjs from 'dayjs'

export const getAllPets = async (req: Request, res: Response): Promise<void> => {
  try {
    const pets = await Pet.find({}).sort({ createdAt: -1 })

    res.status(200).json({
      message: 'Pets retrieved successfully',
      data: pets,
      count: pets.length,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve pets',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const createPet = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body

    // ตรวจสอบข้อมูลด้วย validation function
    if (!validateCreatePetInput(body)) {
      res.status(400).json({
        error: 'Invalid pet data',
        details:
          'Please provide valid name, type, breed, and optional status, birthDate, imageUrl, owner',
      })
      return
    }

    const petData: ICreatePetInput = body

    // เตรียมข้อมูลสำหรับสร้างสัตว์เลี้ยง
    const newPetData = {
      name: petData.name,
      type: petData.type,
      breed: petData.breed,
      status: petData.status || PetStatus.AVAILABLE,
      birthDate: petData.birthDate
        ? typeof petData.birthDate === 'string'
          ? dayjs(petData.birthDate).toDate()
          : petData.birthDate
        : null,
      imageUrl: petData.imageUrl || undefined, // จะใช้ default จาก schema ถ้าไม่ระบุ
      owner: petData.owner || null,
    }

    const newPet = new Pet(newPetData)
    await newPet.save()

    res.status(201).json({
      message: 'Pet created successfully',
      data: newPet,
    })
  } catch (error) {
    // จัดการ error จาก Mongoose validation
    if (error instanceof Error) {
      // Mongoose validation error
      if (error.name === 'ValidationError') {
        res.status(400).json({
          error: 'Validation error',
          details: error.message,
        })
        return
      }

      // Duplicate key error
      if (error.name === 'MongoServerError' || (error as { code?: number }).code === 11000) {
        res.status(400).json({
          error: 'Duplicate entry',
          details: 'Pet with this ID already exists',
        })
        return
      }
    }

    res.status(500).json({
      error: 'Failed to create pet',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const getPetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({
        error: 'Invalid request',
        details: 'Pet ID is required',
      })
      return
    }

    const pet = await Pet.findOne({ id })

    if (!pet) {
      res.status(404).json({
        error: 'Pet not found',
        details: `Pet with ID "${id}" does not exist`,
      })
      return
    }

    res.status(200).json({
      message: 'Pet retrieved successfully',
      data: pet,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve pet',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const updatePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const body = req.body

    if (!id) {
      res.status(400).json({
        error: 'Invalid request',
        details: 'Pet ID is required',
      })
      return
    }

    // ตรวจสอบว่าสัตว์เลี้ยงมีอยู่จริง
    const existingPet = await Pet.findOne({ id })
    if (!existingPet) {
      res.status(404).json({
        error: 'Pet not found',
        details: `Pet with ID "${id}" does not exist`,
      })
      return
    }

    // ตรวจสอบข้อมูลด้วย validation function
    if (!validateUpdatePetInput(body)) {
      res.status(400).json({
        error: 'Invalid pet data',
        details: 'Please provide valid name, type, breed, status, birthDate, imageUrl, or owner',
      })
      return
    }

    const petData: IUpdatePetInput = body

    // เตรียมข้อมูลสำหรับอัปเดต (เฉพาะ fields ที่ส่งมา)
    const updateData: Record<string, unknown> = {}

    if (petData.name !== undefined) {
      updateData.name = petData.name
    }
    if (petData.type !== undefined) {
      updateData.type = petData.type
    }
    if (petData.breed !== undefined) {
      updateData.breed = petData.breed
    }
    if (petData.status !== undefined) {
      updateData.status = petData.status
    }
    if (petData.birthDate !== undefined) {
      updateData.birthDate = petData.birthDate
        ? typeof petData.birthDate === 'string'
          ? dayjs(petData.birthDate).toDate()
          : petData.birthDate
        : null
    }
    if (petData.imageUrl !== undefined) {
      updateData.imageUrl = petData.imageUrl
    }
    if (petData.owner !== undefined) {
      updateData.owner = petData.owner
    }

    // ตรวจสอบว่ามีข้อมูลที่จะอัปเดตหรือไม่
    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        error: 'Invalid request',
        details: 'No fields to update',
      })
      return
    }

    const updatedPet = await Pet.findOneAndUpdate({ id }, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updatedPet) {
      res.status(404).json({
        error: 'Pet not found',
        details: `Pet with ID "${id}" does not exist`,
      })
      return
    }

    res.status(200).json({
      message: 'Pet updated successfully',
      data: updatedPet,
    })
  } catch (error) {
    // จัดการ error จาก Mongoose validation
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({
          error: 'Validation error',
          details: error.message,
        })
        return
      }
    }

    res.status(500).json({
      error: 'Failed to update pet',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const deletePet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({
        error: 'Invalid request',
        details: 'Pet ID is required',
      })
      return
    }

    const pet = await Pet.findOneAndDelete({ id })

    if (!pet) {
      res.status(404).json({
        error: 'Pet not found',
        details: `Pet with ID "${id}" does not exist`,
      })
      return
    }

    res.status(200).json({
      message: 'Pet deleted successfully',
      data: pet,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete pet',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
