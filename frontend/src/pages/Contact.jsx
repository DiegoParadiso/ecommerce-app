import React from 'react'
import Title from '../components/Title'

const Contact = () => {
  return (
    <div className='my-5 md:my-8 px-4 max-w-3xl mx-auto text-center text-gray-700'>
      <div className='mb-4 sm:mb-10'>
        <Title text1={'NUESTRO'} text2={'CONTACTO'} />
      </div>

      <div className='space-y-10 sm:space-y-15 text-sm leading-relaxed'>
        <p className='sm:leading-[2.5]'>
        Ante cualquier duda, consulta o propuesta, comunicarse al siguiente mail, o completando el formulario que se encuentra debajo.
        </p>
        <p className='sm:leading-[2.5] text-black font-bold'>
        contacto@nofiguro.com</p>
        <form className='space-y-1 max-w-xl mx-auto'>
  <input
    type='text'
    name='name'
    placeholder='Nombre'
    required
    className='w-full border border-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500'
  />

  <input
    type='email'
    name='email'
    placeholder='Email'
    required
    className='w-full border border-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500'
  />

  <textarea
    name='message'
    placeholder='Mensaje'
    rows='5'
    required
    className='w-full border border-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none placeholder-gray-500'
  ></textarea>

  <button
    type='submit'
    className='bg-black w-full text-white px-6 py-2 hover:bg-gray-800 transition'
  >
    Enviar
  </button>
</form>
      </div>
    </div>
  );
}

export default Contact