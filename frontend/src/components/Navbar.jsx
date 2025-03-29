import React from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'  

const Navbar = () => {

  const [visible, setVisible] = React.useState(false)

  return (
<div className="flex items-center justify-between py-5 font-medium min-h-[60px]">
<Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
          <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
            <p>TIENDA</p>
            <hr className='w-2/4 border-none h-[1px] bg-gray-700 '></hr>
          </NavLink>
          <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>NOSOTROS</p>
            <hr className='w-2/4 border-none h-[1px] bg-gray-700 '></hr>
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACTO</p>
            <hr className='w-2/4 border-none h-[1px] bg-gray-700 '></hr>
          </NavLink>
        </ul>

        <div className='flex items-center gap-4'>
          <img src={assets.search_icon} className='w-4 cursor-pointer' alt="" />
          
          <div className='group relative'>
            <img className='w-4 cursor-pointer'src={assets.profile_icon} alt="" />
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>Perfil</p>
                <p className='cursor-pointer hover:text-black'>Ordenes</p>
                <p className='cursor-pointer hover:text-black'>Cerrar Sesión</p> 
              </div>
            </div>
          </div>  
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-4 min-w-4' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-3.5 text-center leading-4 bg-black text-white aspect-square rounded-full text-[7px]'></p>
          </Link>
          <img onClick={()=>setVisible(true)} src ={assets.menu_icon} className='w-4 cursor-pointer sm:hidden' alt="" />
        </div>

        {/* Sidebar menu for small screens */}
        <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
              <p>Volver</p>
            </div>
            <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/'>Inicio</NavLink>
            <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/collection'>Colección</NavLink>
            <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/about'>Nosotros</NavLink>
            <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border' to='/contact'>Contacto</NavLink>
          </div>
        </div>
    </div>
  )
}

export default Navbar