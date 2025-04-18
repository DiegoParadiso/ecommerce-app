import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const CartTotal = () => {


    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className='w-full'>
        <div className='font-titles my-3'>
            <Title text1={'TOTAL DEL'} text2={'CARRITO'}></Title>
        </div>

        <div className='flex flex-col gap-2 mt-2'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Tarifa de Envío</p>
                <p>{currency} {subtotal === 0 ? '0.00' : delivery_fee.toFixed(2)}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {total.toFixed(2)}</b>
            </div>
        </div>

    </div>
  )
}

export default CartTotal