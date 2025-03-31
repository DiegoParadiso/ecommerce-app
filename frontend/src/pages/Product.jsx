import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Product = () => {

  const {productId} = useParams();
  const {products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) { 
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'></img>
              ))
            } 
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-full object-cover' alt="" />
          </div>
        </div>
        { /* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-lg mt-2'>{productData.name}</h1> 
          <p className='mt-5 text-xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-sm hover:text-gray-700, underline text-gray-500 hover:text-gray-600 cursor-pointer '>VER MEDIOS DE PAGO</p>
          <p className='mt-5 w-full text-black text-xs'>{productData.description}</p>
          <div className='flex gap-3 mt-5'>
            <button className='w-full bg-gray-100 text-black px-8 py-3 text-xs hover:bg-gray-200 cursor-pointer'>AGREGAR AL CARRITO</button>
          </div>
          <hr className='mt-8 sm:w-4/5'></hr>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p className='text-black text-xs'>Calculá el costo de envío</p>
          </div>
        </div>
      </div>
    </div>
  ) : <div className='opacity-0'>

  </div>
}

export default Product