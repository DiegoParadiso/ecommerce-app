import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {
        headers: { token }
      });

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const statusMap = {
    'orden tomada': 'Orden tomada',
    'preparando': 'Preparando',
    'enviado': 'Enviado',
    'para retirar': 'Para retirar',
    'entregado': 'Entregado'
  };

  const normalizeStatus = (status) => {
    return statusMap[status?.toLowerCase().trim()] || 'Orden tomada';
  };

  return (
    <div className='pt-6 mb-4 sm:mb-10'>
      <div>
        <Title text1="MIS" text2="PEDIDOS" />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div key={index} className='gap-4 py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name}></img>
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-gray-700'>
                  <p>{currency}{item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                </div>
                <p className='mt-2'>Fecha: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-2'>Método de Pago: <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex gap-2 items-center'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm'>{normalizeStatus(item.status)}</p>
              </div>
              <button onClick={loadOrderData} className='border px-4 py-2 rounded-sm'>Seguir el envío</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
