import React, { useState } from 'react';
import axios from 'axios'
import { backendUrl } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setToken}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error de login:", error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-white'>
      <div className='w-full max-w-sm px-6 py-8 border border-gray-200 rounded-xl'>
        <h1 className='text-xl font-semibold text-gray-800 mb-6 text-center'>
          Panel de Administrador
        </h1>
        <form onSubmit={onSubmitHandler} className='space-y-4'>
          <div>
            <label className='block text-sm text-gray-600 mb-1'>
              Dirección de Email
            </label>
            <input
            onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Email'
              className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-gray-600 mb-1'>
              Contraseña
            </label>
            <input
            onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Contraseña'
              className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors'
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;