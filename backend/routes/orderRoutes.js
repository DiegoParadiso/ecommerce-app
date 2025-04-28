 import express from 'express'
 import { allOrders, updateStatus, userOrders } from '../controllers/orderController.js' 
 import adminAuth from '../middleware/adminAuth.js'
 import authUser from '../middleware/auth.js'

 const orderRouter = express.Router();

 // Admin Features 
 orderRouter.post('list',adminAuth, allOrders)
 orderRouter.post('status',adminAuth, updateStatus )

 // Payment Features

 // User Features
 orderRouter.post('/userorders', authUser, userOrders)

 export default orderRouter