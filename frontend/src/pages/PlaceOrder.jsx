import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '',
    state: '', cp: '', country: '', phone: ''
  });

  const [method, setMethod] = useState('mercadopago'); // método por defecto

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const productId in cartItems) {
        const quantity = cartItems[productId];
        if (quantity > 0) {
          const productInfo = products.find(product => product._id === productId);
          if (productInfo) {
            orderItems.push({ ...productInfo, quantity });
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {
            headers: { token },
          }); 
          console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
          case 'stripe':
            const stripeResponse = await axios.post(backendUrl + '/api/order/stripe', orderData, {
              headers: { token },
            });
            if (stripeResponse.data.success) {
              const { session_url } = stripeResponse.data;
              window.location.replace(session_url);
            } else {
              toast.error(stripeResponse.data.message);
            }
        default:
          toast.error("Seleccioná un método de pago válido");
          break;
        }
      
    } catch (error) {
      console.log(error);
      toast.error("Error al procesar la orden");
    }
  };
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* -------Parte izquierda-------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='my-2'>
          <Title text1={'INFORMACIÓN DE'} text2={'ENVÍO'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Nombre' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Apellido' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='email' placeholder='Correo' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Calle' />
        <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Provincia' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='Ciudad' />
          <input required onChange={onChangeHandler} name='cp' value={formData.cp} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='text' placeholder='C.P.' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 py-1.5 px-3.5 w-full text-xs' type='number' placeholder='Teléfono' />
      </div>

      {/* -------Parte derecha-------- */}
      <div className='w-full lg:max-w-[500px]'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'MÉTODO DE'} text2={'PAGO'} />
{/* Métodos de pago */}
<div className="flex flex-wrap gap-3">
  {[
    { id: 'mercadopago', logo: assets.mp_logo },
    { id: 'stripe', logo: assets.stripe_logo },
    { id: 'transferencia', label: 'TRANSFERENCIA BANCARIA', icon: assets.bank_icon },
    { id: 'efectivo', label: 'EFECTIVO' },
    { id: 'cuotas', label: 'CUOTAS SIN TARJETA DE MERCADOPAGO' },
    { id: 'cod', label: 'PAGO CONTRA ENTREGA' } 
  ].map(option => (
    <div
      key={option.id}
      onClick={() => setMethod(option.id)}
      className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === option.id ? 'border-green-500' : ''}`}
    >
      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === option.id ? 'bg-green-400' : ''}`}></p>
      {option.logo ? (
        <img className='h-5 mx-4' src={option.logo} alt={option.id} />
      ) : option.icon ? (
        <p className='text-gray-500'>
          <img className="h-5 mx-4 inline brightness-0 saturate-0 opacity-50" src={option.icon} alt="icono" />
          {option.label}
        </p>
      ) : (
        <p className='text-gray-500'>{option.label}</p>
      )}
    </div>
  ))}
</div>

          {/* Botón de enviar */}
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
              REALIZAR ORDEN
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;