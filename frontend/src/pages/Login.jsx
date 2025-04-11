import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = React.useState('Iniciar Sesión')

  const onSubmitHandler = async () => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
      </div>
      {currentState === 'Iniciar Sesión' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required></input>}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required></input>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required></input>
      <div className='w-full flex justify-between text-xs mt-[-8px]'>
        <p className='text-gray-500'>¿Olvidaste tu contraseña?</p>
        {
          currentState === 'Iniciar Sesión' 
          ? <p onClick={()=>setCurrentState('Registrarse')} className='text-gray-500 cursor-pointer'>Crear cuenta</p>
          : <p onClick={()=>setCurrentState('Iniciar Sesión')} className='text-gray-500 cursor-pointer'>Ya tengo cuenta</p>
        }
      </div>
      <button className='w-full bg-black text-white px-8 py-2 mt-4'>{currentState === 'Login' ? 'Iniciar Sesión' : 'Registrarse'}</button>
    </form>
  )
}

export default Login