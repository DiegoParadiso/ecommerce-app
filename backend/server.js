import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRoutes.js'

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
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)

app.get('/', (req, res) => {   
    res.send('API working')
})

app.listen(port, ()=> console.log(`Server is running on port ${port}`))