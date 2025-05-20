import express from 'express';
import { placeOrder, placeOrderMp, placeOrderStripe, allOrders, userOrders, updateStatus, verifyOrderPayment } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Crear orden
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/mercadopago', authUser, placeOrderMp);
orderRouter.post('/stripe', authUser, placeOrderStripe);

// Órdenes del usuario 
orderRouter.post('/userorders', authUser, userOrders);

// Admin: todas las órdenes y actualizar estado
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
orderRouter.get('/verify', verifyOrderPayment);


export default orderRouter;