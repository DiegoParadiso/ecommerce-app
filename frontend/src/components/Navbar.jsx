import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  const handleSearchClick = () => {
    navigate('/collection'); // Redirigir a /collection
    setShowSearch(true); // Luego mostrar la barra de búsqueda
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium min-h-[60px]">
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt="" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
        <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
          <p>TIENDA</p>
          <hr className='w-2/4 border-none h-[1px] bg-gray-700'></hr>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>NOSOTROS</p>
          <hr className='w-2/4 border-none h-[1px] bg-gray-700'></hr>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACTO</p>
          <hr className='w-2/4 border-none h-[1px] bg-gray-700'></hr>
        </NavLink>
        <NavLink to='https://open.spotify.com/playlist/7BqhteOexXFHSztz36hz52' className='flex flex-col items-center gap-1'>
          <p>ATELIER</p>
          <hr className='w-2/4 border-none h-[1px] bg-gray-700'></hr>
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        <img onClick={handleSearchClick} src={assets.search_icon} className='w-4 cursor-pointer' alt="Buscar" />
        
        <div className='group relative'>
          <img className='w-4 cursor-pointer' src={assets.profile_icon} alt="Perfil" />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>Perfil</p>
              <p className='cursor-pointer hover:text-black'>Órdenes</p>
              <p className='cursor-pointer hover:text-black'>Cerrar Sesión</p> 
            </div>
          </div>
        </div>  

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-4 min-w-4' alt="Carrito" />
          <p className='absolute right-[-5px] bottom-[-5px] w-3.5 text-center leading-4 bg-black text-white aspect-square rounded-full text-[7px]'>{getCartCount()}</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;