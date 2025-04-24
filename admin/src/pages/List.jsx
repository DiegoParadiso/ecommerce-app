import React, { useState, useEffect } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = ({token}) => {

  const [list,setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if(response.data.success){
        toast.success(response.data.message)
        setList(response.data.products); 
        }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  }

  const removeProduct = async (id) => {
    try{
      const response = await axios.post(backendUrl + '/api/product/remove', { id } , {headers:{token}});

      if(response.data.success){
        toast.success("Producto eliminado correctamente");
        fetchList();
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>Lista de todos los productos</p>
      <div className='flex flex-col gap-2'>
        { /* List table Title */ }
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100'>
          <b>Imagen</b>
          <b>Nombre</b>
          <b>Categoría</b>
          <b>Precio</b> 
          <b className='text-center'>Acción</b> 
        </div>
        { /* List table */ }
        {
        list.map((item,index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border' key={index}>
            <img className='w-12' src={item.image[0]} alt=""/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>x</p>
          </div>
        ))
        }
      </div>
    </>
  );
}

export default List;