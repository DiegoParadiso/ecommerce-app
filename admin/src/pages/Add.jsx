import React from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {

  const token = localStorage.getItem('token');
  
  const [image1, setImage1] = React.useState(false);
  const [image2, setImage2] = React.useState(false);
  const [image3, setImage3] = React.useState(false);
  const [image4, setImage4] = React.useState(false);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('');  
  const [price, setPrice] = React.useState('');  

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = new FormData()
      if (!name || !category || !price) {
        toast.error("Por favor completa todos los campos requeridos.");
        return;
      }
      formData.append("name",name)
      formData.append("description",description)
      formData.append("category",category)
      formData.append("price",price)

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } })


      console.log(response.data)
    }catch(error){
      console.log("Error de carga:", error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  }
  return (
    <form onSubmit={onHandleSubmit} className='flex flex-col w-full items-start gap-3'>
    <div>
      <p className='mb-2'>Cargar imagen</p>
      <div className='flex gap-2'>
      <label htmlFor="image1">
        <img className='w-20 cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
      </label>
      <label htmlFor="image2">
        <img className='w-20 cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
        <input onChange={(e)=>setImage2(e.target.files[0])}  type="file" id="image2" hidden/>
      </label>
      <label htmlFor="image3">
        <img className='w-20 cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
        <input onChange={(e)=>setImage3(e.target.files[0])}  type="file" id="image3" hidden/>
      </label>
      <label htmlFor="image4">
        <img className='w-20 cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
        <input onChange={(e)=>setImage4(e.target.files[0])}  type="file" id="image4" hidden/>
      </label>
      </div>
    </div> 
    <div className='w-full'>
      <p className='mb-2'>Nombre del Producto</p>
      <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='' className='w-full max-w-[500px] px-3 py-2 text-xs' required/>   
    </div>
    <div className='w-full'>
      <p className='mb-2'>Descripción del Producto</p>
      <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  type="text" placeholder='' className='w-full max-w-[500px] px-3 py-2 text-xs' required/>   
    </div>

    <div className='w-full  max-w-[500px]  flex flex-col gap-2 sm:flex-row sm:gap-8'>
      <div className='sm:w-1/2'>
      <p className='mb-2'>Categoría del Producto</p>
      <select onChange={(e)=>setCategory(e.target.value)} value={category}  name="" id="" className='w-full px-3 py-2 text-xs' required>
        <option value="Remera">Remera</option>
        <option value="Pantalon">Pantalón</option>
        <option value="Buzo">Buzo</option>
        <option value="Abrigo">Abrigo</option>
        <option value="Accesorio">Accesorio</option>
      </select>
      </div>
      <div className='sm:w-1/2'>
      <p className='mb-2'>Precio del Producto</p>
      <input onChange={(e)=>setPrice(e.target.value)} value={price}  type="number" placeholder='' className='w-full px-3 py-2 text-xs' required/>
      </div>
    </div>
    <button type='submit' className='w-full text-xs max-w-[500px] py-2 mt-4 text-sm text-black bg-white border border-black hover:bg-black hover:text-white transition'>Añadir</button>
    </form>
    
  );
}

export default Add;