import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js'

const productRouter = express.Router();

productRouter.post('/add', addProduct)
productRouter.get('/list', listProducts)
productRouter.post('/remove', removeProduct)
productRouter.post('/single', singleProduct)

export default productRouter;