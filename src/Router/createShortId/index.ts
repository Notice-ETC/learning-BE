import express from 'express'
import type { Request, Response } from 'express'
import shortid from 'shortid'

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const shortId = shortid.generate()
    res.status(201).json({
      message: 'ShortId created successfully',
      shortId: shortId,
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to save text',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

export default router
