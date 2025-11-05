import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import createShortId from './Router/createShortId'
import petRouter from './Router/pet'
// โหลดค่า env
dotenv.config()

// เชื่อมต่อกับ MongoDB
// connectDB();

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//router หรือ part
app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.use('/createShortId', createShortId)
app.use('/pet', petRouter)

// app.use('/createText', createText)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
