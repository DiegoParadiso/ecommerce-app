import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

// Cargar las variables de entorno
dotenv.config()

//App Config
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors())

// API endpoints
app.get('/', (req, res) => {   
    res.send('API working')
})

app.listen(port, ()=> console.log(`Server is running on port ${port}`))