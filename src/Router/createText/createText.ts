import express from 'express';
import type { Request, Response } from 'express';
import TestDB from '../../Database/TestDB/TestDB';

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const {text} = req.body;
        if(!text){
            res.status(400).json({ error: 'Text is required but you not send' });
            return;
        }

        // สร้างและบันทึกข้อมูลใหม่
        const newText = new TestDB({ name: text });
        await newText.save();

        res.status(201).json({ 
            message: 'Text saved successfully',
            data: newText 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to save text',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router; 