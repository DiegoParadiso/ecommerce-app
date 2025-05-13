import orderModel from '../models/orderModel.js';
import { MercadoPagoConfig, Order } from 'mercadopago';

// Inicializamos el cliente de MercadoPago
const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: { timeout: 5000 },
});

// Inicializamos la API para órdenes de MercadoPago
const mpOrder = new Order(mpClient);

const placeOrder = async (req, res) => {
  console.log("Recibiendo la solicitud para crear la orden...");

  try {
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.user.id;

    // Validación de campos
    if (!items || items.length === 0 || !amount || !address || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, message: 'El monto debe ser un número positivo' });
    }

    // Creamos la orden en nuestra base de datos (sin pago aún)
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
      date: Date.now(),
    });

    if (paymentMethod === 'mercadopago') {
      // Guardamos la orden primero para disponer de un ID y usarlo como external_reference
      await newOrder.save();

      // Construimos el cuerpo de la solicitud para MercadoPago
      const orderBody = {
        type: "online",
        processing_mode: "automatic",
        total_amount: amount.toFixed(2),
        external_reference: `order_${newOrder._id}`, // Referencia externa con el ID de la orden
        payer: {
          email: req.body.email, // Se asume que el request incluye el email del pagador
        },
        transactions: {
          payments: items.map(item => ({
            amount: (item.price * item.quantity).toFixed(2),
            payment_method: {
              // Información del método de pago; se debe ajustar según la integración
              id: "mercadopago",
            },
          })),
        },
      };

      // Objeto opcional de opciones: clave de idempotencia para evitar creación duplicada
      const requestOptions = {
        idempotencyKey: `order_${newOrder._id}_${Date.now()}`,
      };

      // Realizamos la creación de la orden en MercadoPago
      const mpResponse = await mpOrder.create({ body: orderBody, requestOptions });

      return res.status(201).json({
        success: true,
        mp_response: mpResponse.body,
        order: newOrder,
      });
    }

    // Si el método de pago no es con MercadoPago, simplemente guardamos la orden localmente
    await newOrder.save();
    res.status(201).json({ success: true, message: 'Orden colocada exitosamente', order: newOrder });
  } catch (error) {
    console.error('Error al colocar la orden:', error);
    res.status(500).json({ success: false, message: 'Error al colocar la orden', error });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener órdenes', error });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener órdenes del usuario', error });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: 'Estado actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar estado', error });
  }
};

export { placeOrder, allOrders, userOrders, updateStatus };
