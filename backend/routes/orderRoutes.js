import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Crear orden
orderRouter.post('/place', authUser, placeOrder)

// Órdenes del usuario
orderRouter.get('/userorders', authUser, userOrders)

// Admin: todas las órdenes y actualizar estado
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

export default orderRouter