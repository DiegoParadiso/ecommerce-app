import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Crear orden
orderRouter.post('/place', authUser, placeOrder)

// Órdenes del usuario
orderRouter.get('/userorders/:userId', authUser, userOrders)

// Admin: todas las órdenes y actualizar estado
orderRouter.get('/list', adminAuth, allOrders)
orderRouter.put('/status/:orderId', adminAuth, updateStatus)

export default orderRouter