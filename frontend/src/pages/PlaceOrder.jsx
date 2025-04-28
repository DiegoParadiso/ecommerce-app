import React, { useContext, useState} from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    cp:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data=> ({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try{
      let orderItems = [];
      for (const productId in cartItems) {
        const quantity = cartItems[productId];
        if (quantity > 0) {
          const productInfo = products.find(product => product._id === productId);
          if (productInfo) {
            const itemInfo = { 
              ...productInfo, 
              quantity: quantity 
            };
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData= {
        address: formData,
        items: orderItems,
        amount: getCartAmount()+delivery_fee,
      }
      switch(method){
        //API con Case de métodos
      }
      console.log(orderItems)
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
<form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] border-t'>
{/* -------Left side-------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='my-2'>
          <Title text1={'INFORMACIÓN DE'} text2={'ENVÍO'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Nombre'></input>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Apellido'></input>
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='email' placeholder='Correo'></input>
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Calle'></input>
        <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Provincia'></input>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Ciudad'></input>
          <input required onChange={onChangeHandler} name='cp' value={formData.cp} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='C.P.'></input>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='number' placeholder='Teléfono'></input>
      </div>

      {/* -------Left side-------- */}
      <div className='w-full lg:max-w-[500px]'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'MÉTODO DE'} text2={'PAGO'} />
          {/* -------Payment Method Selection-------- */}
          <div className="flex flex-wrap gap-3">
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>    {/* onClick={() => setMethod('stripe')}*/}
             <p className='min-w-3.5 h-3.5 border rounded-full'></p>   {/* <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>*/}
             <img className='h-5 mx-4' src={assets.mp_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p- px-3 cursor-pointer'>   
             <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
             <img className='h-5 mx-4' src={assets.uala_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>   
             <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
             <img className='h-5 mx-4' src={assets.binancepay_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p- px-3 cursor-pointer'>   
             <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
             <img className='h-4 mx-4' src={assets.modo_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>   
             <p className='min-w-3.5 h-3.5 border rounded-full'></p> 
             <img className='h-5 mx-4' src={assets.cuentadni_logo} alt="" />
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'> 
             <p className='min-w-3.5 h-3.5 border rounded-full'></p>   
             <p className='text-gray-500'> <img className="h-5 mx-4 inline brightness-0 saturate-0 opacity-50" src={assets.bank_icon} alt="Banco" />TRANSFERENCIA BANCARIA</p>
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'> 
             <p className='min-w-3.5 h-3.5 border rounded-full'></p>   
             <p className='text-gray-500'>EFECTIVO</p>
          </div>
          <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'> 
             <p className='min-w-3.5 h-3.5 border rounded-full'></p>   
             <p className='text-gray-500'>CUOTAS SIN TARJETA DE MERCADOPAGO</p>
          </div>
          </div>
          <div className='w-full text-end mt-8'> 
            <button type='submit' onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder