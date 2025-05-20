import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import { MercadoPagoConfig, Preference } from 'mercadopago';

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
  try {
    console.log('Origin recibido:', req.headers.origin);
console.log('Fallback FRONTEND_URL:', process.env.FRONTEND_URL);
    const { userId, items, amount, address, email } = req.body;
    const origin = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "MercadoPago",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Configuración de MercadoPago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const itemsMP = items.map((item) => ({
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: 'ARS',
    }));

    // Agregamos el cargo por delivery como ítem adicional
    itemsMP.push({
      title: 'Delivery',
      quantity: 1,
      unit_price: 6000,
      currency_id: 'ARS',
    });
console.log("back_urls:", {
  success: `${origin}/verify?success=true&orderId=${newOrder._id}`,
  failure: `${origin}/verify?success=false&orderId=${newOrder._id}`,
  pending: `${origin}/verify?success=pending&orderId=${newOrder._id}`,
});
    const body = {
      items: itemsMP,
      external_reference: newOrder._id.toString(),
      payer: {
        email,
      },
      back_urls: {
        success: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        failure: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        pending: `${origin}/verify?success=pending&orderId=${newOrder._id}`,
      },
      // auto_return: 'approved',
    };

    const response = await preference.create({ body });

    res.status(200).json({
      success: true,
      url: response.init_point, // este es el link para redireccionar al usuario
      orderId: newOrder._id,
    });

  } catch (error) {
    console.error("Error al crear orden con MP:", error);
    res.status(500).json({ success: false, message: 'Error al crear orden con MercadoPago', error: error.message });
  }
};
const verifyOrderPayment = async (req, res) => {
  try {
    const { success, orderId } = req.query;

    if (success === 'true' && orderId) {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: 'pagado',
      });
      return res.json({ success: true, message: 'Orden actualizada como pagada' });
    }

    res.status(400).json({ success: false, message: 'Datos inválidos' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};
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

export { placeOrder, placeOrderMp, placeOrderStripe, verifyOrderPayment, allOrders, userOrders, updateStatus };
