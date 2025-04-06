import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'

const PlaceOrder = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* -------Left side-------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='font-titles my-2'>
          <Title text1={'INFORMACIÓN DE'} text2={'ENVÍO'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Nombre'></input>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Apellido'></input>
        </div>
        <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='email' placeholder='Correo'></input>
        <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Calle'></input>
        <div className='flex gap-3'>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Ciudad'></input>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Provincia'></input>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Código postal'></input>
        </div>
        <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='number' placeholder='Teléfono'></input>
      </div>

      {/* -------Left side-------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'MÉTODO DE'} text2={'PAGO'} />
          {/* -------Payment Method Selection-------- */}
          <div className='flex gap-3 flex-col lg:flex-row'> 
          </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder