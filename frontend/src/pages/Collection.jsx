import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);	
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item !== e.target.value));
    } else {
        setCategory(prev => [...prev, e.target.value]);
      }
    };

  const applyFilters = () => { 
    let productsCopy = products.slice();

    if (showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    } 
    setFilterProducts(productsCopy);
  }

  const sortProducts = (e) => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
      setFilterProducts(fpCopy.sort((a,b) => a.price - b.price));
      break;
      case 'high-low':
      setFilterProducts(fpCopy.sort((a,b) => b.price - a.price));
      break;
      default:
      applyFilters();
      break;
    }
  }

  useEffect(() => {
    setFilterProducts(products);
  },[])

  useEffect(() => {
    console.log(category);
  },[category])

  useEffect(() => {
    applyFilters();
  } , [category, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  } , [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-3 border-t">

      {/* Filters Options */}
      <div className="min-w-60 sm:mt-10 sm:pt-5">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xs flex items-center cursor-pointer gap-2 sm:hidden text-gray-700">
          <img className={`h-3 w-auto transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          <span className="leading-none">Categorias</span>
        </p>
        {/* Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <div className="flex flex-col gap-2 text-xs font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Remera" onChange={toggleCategory} /> Remeras
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Pantalon" onChange={toggleCategory} /> Pantalones
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Abrigo" onChange={toggleCategory} /> Abrigos
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Buzo" onChange={toggleCategory} /> Buzos
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Accesorio" onChange={toggleCategory} /> Accesorios
            </p>
          </div>
        </div>
      </div>
      
      {/* Products List */}
      <div className="flex-1 ">
        <div className="flex justify-between pt-3 sm:pt-4 mb-4">
          <Title text1={'LISTA DE'} text2={'PRODUCTOS'} />
          { /* Products Sorts */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 appearance-none text-xs px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="relavent">Relevancia</option>
            <option value="low-high">Menor Precio</option>
            <option value="high-low">Mayor Precio</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
          {
            filterProducts.map((item,index) =>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Collection;