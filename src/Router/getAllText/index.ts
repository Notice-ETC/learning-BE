import express from 'express'
import type { Request, Response } from 'express'
import TestDB from '../../Database/TestDB/Schema/TestDB'

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const allTexts = await TestDB.find().sort({ createdAt: -1 })
    
    res.status(200).json({
      message: 'Get all texts successfully',
      data: allTexts,
      count: allTexts.length,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get all texts',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

export default router

