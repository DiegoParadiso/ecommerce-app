import React, { use, useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);	

  useEffect(() => {
    setFilterProducts(products);
  },[])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-3 border-t">

      {/* Filters Options */}
      <div className="min-w-60 sm:mt-10">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        
        {/* Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <div className="flex flex-col gap-2 text-xs font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Remera" /> Remeras
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Pantalon" /> Pantalones
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Abrigo" /> Abrigos
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Buzo" /> Buzos
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Accesorio" /> Accesorios
            </p>
          </div>
        </div>
      </div>
      
      {/* Products List */}
      <div className="flex-1">
        <div className="flex justify-between pt-4 mb-4">
          <Title text1={'LISTA DE'} text2={'PRODUCTOS'} />
          { /* Products Sorts */}
          <select className="border-2 appearance-none text-xs px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="relevancia">Relevancia</option>
            <option value="menor-precio">Menor Precio</option>
            <option value="mayor-precio">Mayor Precio</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item,index) =>(
              <ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Collection;