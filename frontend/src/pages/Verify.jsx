import { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
  const [params] = useSearchParams();
  const { backendUrl, token } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const success = params.get('success');
    const orderId = params.get('orderId');

    if (success === 'true' && orderId) {
      axios.get(`${backendUrl}/api/order/verify?success=true&orderId=${orderId}`, {
        headers: { token }
      })
      .then(() => {
        toast.success('¡Pago confirmado!');
        navigate('/orders');
      })
      .catch(() => {
        toast.error('Error al confirmar el pago');
        navigate('/');
      });
    } else {
      toast.error('Pago no confirmado');
      navigate('/');
    }
  }, []);

  return null; 
};

export default Verify;