import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-bold">Pedidos:</h3>
      <div>
        {orders.map((order, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs text-gray-700">
            <img src={assets.parcel_icon} alt="" className='w-12' />
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className='py-0.5' key={idx}>
                    {item.name} x {item.quantity}{idx < order.items.length - 1 ? ',' : ''}
                  </p>
                ))}
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName} {order.address.lastName}</p>
              <div>
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.cp}</p>
                <p>{order.address.country}</p>
                <p>{order.address.phone}</p>
              </div>
            </div>
            <div>
              <p className='text-sm sm:text-[15px] pb-5'>Items: {order.items.length}</p>
              <p>Método de pago: {order.paymentMethod}</p>
              <p>Pago: {order.payment ? 'Pagado' : 'Pendiente'}</p>
              <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='font-semibold p-2'>
              <option value="orden tomada">Orden tomada</option>
              <option value="preparando">Preparando</option>
              <option value="enviado">Enviado</option>
              <option value="para retirar">Para retirar</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
