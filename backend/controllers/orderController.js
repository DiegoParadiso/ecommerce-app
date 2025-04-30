import orderModel from '../models/orderModel.js'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })

const placeOrder = async (req, res) => {
  console.log("Recibiendo la solicitud para crear la orden...");

  try {
    const { items, amount, address, paymentMethod } = req.body
    const userId = req.user.id

    // Validación de campos
    if (!items || items.length === 0 || !amount || !address || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Datos incompletos' })
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, message: 'El monto debe ser un número positivo' })
    }

    // Crear la orden en la base de datos
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
      date: Date.now(),
    })

    // Si el pago es con MercadoPago
    if (paymentMethod === 'mercadopago') {
      const preferenceData = {
        items: items.map(item => ({
          title: item.name,
          quantity: item.quantity,
          currency_id: 'ARS',
          unit_price: item.price,
        })),
        back_urls: {
          success: process.env.SUCCESS_URL,
          failure: process.env.FAILURE_URL,
          pending: process.env.PENDING_URL,
        },
        auto_return: 'approved',
      }

      const preference = await new Preference(client).create(preferenceData)

      // Guardar la orden
      await newOrder.save()

      return res.status(201).json({
        success: true,
        init_point: preference.body.init_point, // Enlace para iniciar el pago
        order: newOrder,
      })
    }

    // Si el pago no es con MercadoPago, simplemente guardamos la orden
    await newOrder.save()
    res.status(201).json({ success: true, message: 'Orden colocada exitosamente', order: newOrder })
  } catch (error) {
    console.error('Error al colocar la orden:', error)
    res.status(500).json({ success: false, message: 'Error al colocar la orden', error })
  }
}

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find()
    res.status(200).json({ success: true, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener órdenes', error })
  }
}

const userOrders = async (req, res) => {
  try {
    const { userId } = req.params
    const orders = await orderModel.find({ userId })
    res.status(200).json({ success: true, orders })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener órdenes del usuario', error })
  }
}

const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.status(200).json({ success: true, message: 'Estado actualizado correctamente' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar estado', error })
  }
}

export { placeOrder, allOrders, userOrders, updateStatus }