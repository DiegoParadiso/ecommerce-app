import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
// Asegurate de importar assets si usás una imagen:
import assets from '../assets'; // <-- ajustar si es necesario

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
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

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-bold">Pedidos:</h3>
      <div>
        {orders.map((order, index) => (
          <div key={index} className="border p-4 my-2 rounded shadow">
            <img src={assets.parcel_icon} alt="Paquete" className="w-8 h-8" />

            <div>
              {order.items.map((item, idx) => (
                <p key={idx}>
                  {item.name} x {item.quantity}
                  {idx !== order.items.length - 1 ? ',' : ''}
                </p>
              ))}
            </div>

            <p>
              {order.address.firstName} {order.address.lastName}
            </p>

            <div>
              <p>
                {order.address.street}, {order.address.city},{' '}
                {order.address.state}, {order.address.cp}
              </p>
              <p>{order.address.country}</p>
            </div>

            <p>{order.address.phone}</p>

            <div>
              <p>Items: {order.items.length}</p>
              <p>Método de pago: {order.paymentMethod}</p>
              <p>Estado: {order.payment ? 'Hecho' : 'Pendiente'}</p>
              <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p>{currency}{order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
