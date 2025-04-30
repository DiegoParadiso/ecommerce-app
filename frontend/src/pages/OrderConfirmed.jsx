import React from 'react';

const OrderConfirmed = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">¡Gracias por tu compra!</h1>
      <p className="text-gray-600 text-sm sm:text-base max-w-md">
        Tu pedido ha sido recibido correctamente. Pronto te contactaremos con los detalles del envío.
      </p>
    </div>
  );
};

export default OrderConfirmed;