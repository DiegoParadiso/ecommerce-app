import orderModel from '../models/orderModel.js';
import { MercadoPagoConfig, Order } from 'mercadopago';

// Inicializamos el cliente
const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: { timeout: 5000 }, // opcional
});

// Inicializamos la API de órdenes
const mpOrder = new Order(mpClient);

const placeOrder = async (req, res) => {
  console.log("Recibiendo la solicitud para crear la orden...");

  try {
    const { userId, items, amount, address, paymentMethod, email } = req.body;

    if (!items || items.length === 0 || !amount || !address || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, message: 'El monto debe ser un número positivo' });
    }

    // Creamos la orden en nuestra base de datos
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();
    console.log("Orden guardada en la base de datos con ID:", newOrder._id);

    if (paymentMethod === 'mercadopago') {
      const body = {
        type: "online",
        processing_mode: "aggregator",
        external_reference: `order_${newOrder._id}`,
        total_amount: amount,
        payer: {
          email,
        },
        items: items.map((item) => ({
          title: item.name.trim(),
          unit_price: item.price,
          quantity: item.quantity,
        })),
      };

      console.log("Cuerpo de la solicitud a MP Order:", body);

      const mpResponse = await mpOrder.create({ body });

      console.log("Respuesta de MercadoPago:", mpResponse);

      const paymentUrl = mpResponse.sandbox_init_point || mpResponse.init_point;

      return res.status(201).json({
        success: true,
        payment_url: paymentUrl,
        order: newOrder,
      });
    }

    res.status(201).json({ success: true, message: 'Orden colocada exitosamente', order: newOrder });
  } catch (error) {
    console.error("Error al colocar la orden:", error);
    res.status(500).json({ success: false, message: 'Error al colocar la orden', error: error.message });
  }
};



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
    const { userId } = req.params;
    const orders = await orderModel.find({ userId });
    console.log(`Órdenes obtenidas para el usuario ${userId}:`, orders);
    res.status(200).json({ success: true, orders });
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

export { placeOrder, allOrders, userOrders, updateStatus };
