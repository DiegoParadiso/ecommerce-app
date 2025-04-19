import React from 'react';
import { assets } from '../assets/assets';

const NavBar = () => {
  return (
    <div className='flex justify-between items-center bg-white py-2 px-4 sm:px-8 lg:px-16 shadow-md'>
      <img
        className='w-32 sm:w-36 md:w-40 object-contain'
        src={assets.logo}
        alt="Logo"
      />
      <button className='px-4 py-2 sm:px-6 sm:py-2 text-xs'>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default NavBar;