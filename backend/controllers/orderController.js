import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import { MercadoPagoConfig, Order } from 'mercadopago';

// Global variables
const currency = 'ARS';
const deliveryCharge = 6000;

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

  try{
  const { userId, items, amount, address } = req.body;
  const { origin } = req.headers;

  const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod: "Stripe",
    payment: false,
    date: Date.now()
  }

  const newOrder = new orderModel(orderData);
  await newOrder.save();

  const line_items = items.map((item) => ({
    price_data:{
      currency: currency,
      product_data:{
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity
    }))
    line_items.push({
          price_data:{
      currency: currency,
      product_data:{
        name: 'Delivery Charges',
      },
      unit_amount: deliveryCharge * 100,
    },
    quantity: 1
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
  });
  res.json({ success: true, url: session.url });
}
catch (error){
  console.error("Error al crear la orden:", error);
  res.status(500).json({ success: false, message: 'Error al crear la orden', error: error.message });
}
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
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ success: false, message: 'Error al actualizar estado', error: error.message });
  }
};

export { placeOrder, placeOrderMp, placeOrderStripe, allOrders, userOrders, updateStatus };
