import express from 'express'
import {
  getAllPets,
  createPet,
  getPetById,
  updatePet,
  deletePet,
} from '../../Database/Pet/Controller'

const router = express.Router()

router.get('/', getAllPets)
router.get('/:id', getPetById)
router.post('/create-pet', createPet)
router.put('/:id', updatePet)
router.delete('/:id', deletePet)

export default router
