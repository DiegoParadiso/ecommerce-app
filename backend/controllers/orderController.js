import orderModel from '../models/orderModel.js';

// Método genérico para orden con método específico de pago
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: paymentMethod === 'contraentrega' ? false : true,
      date: Date.now(),
    });
    await newOrder.save();
    res.status(201).json({ success: true, message: 'Orden colocada exitosamente', order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al colocar la orden', error });
  }
};

// Orden vía MercadoPago (asumiendo que el pago ya fue verificado)
const placeOrderMP = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: 'mercadopago',
      payment: true,
      date: Date.now(),
    });
    await newOrder.save();
    res.status(201).json({ success: true, message: 'Orden con MercadoPago creada', order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al colocar la orden con MP', error });
  }
};


const allOrders = async (req, res)=>{

}
const userOrders = async (req, res)=>{

}
const updateStatus = async (req, res)=>{

}

export { placeOrder, placeOrderMP, allOrders, userOrders, updateStatus };