import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    // ----------------- UTILS -------------------

    const getCartCount = () => {
        return Object.values(cartItems).reduce((acc, quantity) => acc + (quantity > 0 ? quantity : 0), 0);
    };

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            if (quantity > 0) {
                const itemInfo = products.find(p => p._id === itemId);
                return itemInfo ? total + itemInfo.price * quantity : total;
            }
            return total;
        }, 0);
    };

    // ----------------- API CALLS -------------------

    const getProductsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/list`);
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error al cargar los productos");
        }
    };

    const getUserCart = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/cart/get`, {}, {
                headers: { token },
            });
            if (data.success) {
                setCartItems(data.cartData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error al cargar el carrito");
        }
    };

    const addToCart = async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId }, {
                    headers: { token },
                });
            } catch (error) {
                toast.error("Error al añadir al carrito");
            }
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: quantity
        }));

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, quantity }, {
                    headers: { token },
                });
            } catch (error) {
                toast.error("Error al actualizar el carrito");
            }
        }
    };

    // ----------------- USE EFFECTS -------------------

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart();
        }
    }, [token]);

    // ----------------- CONTEXT VALUE -------------------

    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;