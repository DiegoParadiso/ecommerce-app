import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-xs'>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2' to="/add">
                <img className='w-5 h-5' src={assets.add_icon} alt=""></img>
                <p className='hidden md:block'>Añadir Elementos</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2' to="/list">
                <img className='w-5 h-5' src={assets.order_icon} alt=""></img>
                <p className='hidden md:block'>Listar Elementos</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2' to="/orders">
                <img className='w-5 h-5' src={assets.order_icon} alt=""></img>
                <p className='hidden md:block'>Pedidos</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar