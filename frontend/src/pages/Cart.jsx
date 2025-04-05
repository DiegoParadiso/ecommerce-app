import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        tempData.push({
          _id: itemId,
          quantity: cartItems[itemId]
        });
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-7'>
      <div className='text-lg mb-3'>
        <Title text1={'TU'} text2={'CARRITO'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img src={productData.image[0]} className='w-16 sm:w-20' alt={productData.name} />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <p className='text-xs text-gray-500'>Cantidad: {item.quantity}</p>
                  <p className='text-xs text-gray-500'>Precio: {currency}{productData.price * item.quantity}</p>
                </div>
              </div>
              <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, parseInt(e.target.value))} className='w-16 sm:w-20 text-center border border-gray-300 rounded-md' type="number" value={item.quantity} min={0} max={productData.stock} />
              <img onClick={()=>updateQuantity(item._id, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt=""></img>
            </div>
          );
        })
      }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
          <button className='w-full bg-gray-100 text-black px-8 py-3 text-sm hover:bg-gray-300 my-3'>PROCEDER AL PAGO</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Cart;