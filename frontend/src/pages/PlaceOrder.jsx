import React, { useContext, useState} from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';

const PlaceOrder = () => {
  return (
<div className='flex flex-col lg:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] border-t'>
{/* -------Left side-------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='my-2'>
          <Title text1={'INFORMACIÓN DE'} text2={'ENVÍO'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Nombre'></input>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Apellido'></input>
        </div>
        <input className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='email' placeholder='Correo'></input>
        <input className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Calle'></input>
        <input className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Provincia'></input>
        <div className='flex gap-3'>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Ciudad'></input>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='C.P.'></input>
        </div>
        <input className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='number' placeholder='Teléfono'></input>
      </div>

      {/* -------Left side-------- */}
      <div className='w-full lg:max-w-[500px]'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'MÉTODO DE'} text2={'PAGO'} />
          {/* -------Payment Method Selection-------- */}
          <div className="flex flex-wrap gap-3">
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>    {/* onClick={() => setMethod('stripe')}*/}
             <p className='min-w-3.5 h-3.5 border rounded-full'></p>   {/* <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>*/}
             <img className='h-5 mx-4' src={assets.mp_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p- px-3 cursor-pointer'>   
             <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
             <img className='h-5 mx-4' src={assets.uala_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>   
             <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
             <img className='h-5 mx-4' src={assets.binancepay_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p- px-3 cursor-pointer'>   
             <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
             <img className='h-4 mx-4' src={assets.modo_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>   
             <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
             <img className='h-5 mx-4' src={assets.cuentadni_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'> 
             <p className='min-w-3.5 h-3.5 border rounded-full'></p>   
             <p className='text-gray-500'> <img className="h-5 mx-4 inline brightness-0 saturate-0 opacity-50" src={assets.bank_icon} alt="Banco" />TRANSFERENCIA BANCARIA</p>
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'> 
             <p className='min-w-3.5 h-3.5 border rounded-full'></p>   
             <p className='text-gray-500'>EFECTIVO</p>
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'> 
             <p className='min-w-3.5 h-3.5 border rounded-full'></p>   
             <p className='text-gray-500'>CUOTAS SIN TARJETA DE MERCADOPAGO</p>
          </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder