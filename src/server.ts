import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import createShortId from './Router/createShortId'
import petRouter from './Router/pet'
import testApi from './Router/testApi'
import connectDB from './config/database'
import createText from './Router/createText/createText'
// โหลดค่า env
dotenv.config()

// เชื่อมต่อกับ MongoDB
connectDB()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//router หรือ part
app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.use('/createShortId', createShortId)
app.use('/createText', createText)
app.use('/pet', petRouter)

app.use('/test', testApi)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

//localhost:5000
