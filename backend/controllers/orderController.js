import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import { MercadoPagoConfig, Order } from 'mercadopago';

const placeOrder = async (req, res) => {
  console.log("Recibiendo la solicitud para crear la orden...");

  try {
    const { userId, items, amount, address, paymentMethod, email } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod:"COD",
      Payment:false,
      date: Date.now(),
    }

    // Creamos la orden en nuestra base de datos
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    console.log("Orden guardada en la base de datos con ID:", newOrder._id);

    await userModel.findByIdAndUpdate(userId, {cartData:{}});

    res.status(201).json({ success: true, message: 'Orden colocada exitosamente', order: newOrder });

  } catch (error) {
    console.error("Error al colocar la orden:", error);
    res.status(500).json({ success: false, message: 'Error al colocar la orden', error: error.message });
  }
};

const placeOrderMp = async (req, res) => {
}

const placeOrderStripe = async (req, res) => {
}

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    console.log("Órdenes obtenidas:", orders);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({ success: false, message: 'Error al obtener órdenes', error: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error al obtener órdenes del usuario:", error);
    res.status(500).json({ success: false, message: 'Error al obtener órdenes del usuario', error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log(`Actualizando el estado de la orden ${orderId} a: ${status}`);
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ success: false, message: 'Error al actualizar estado', error: error.message });
  }
};

export { placeOrder, placeOrderMp, placeOrderStripe, allOrders, userOrders, updateStatus };
