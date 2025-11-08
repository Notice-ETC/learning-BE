import express, { Request, Response } from 'express'

const app = express.Router()

app.get('/', (req: Request, res: Response) => {
  res.json('hello')
})
//สร้าง api path ใหม่ขึ้นมา
app.get('/getTestApi', (req: Request, res: Response) => {
  res.json(GetApi())
})

//function ต่างๆที่เรียกใช้งานและ return ค่าออกไป เช่น การคำนวนราคา, การสร้าง data
const GetApi = () => {
  return { name: 'ขื่อ' }
}
export default app
