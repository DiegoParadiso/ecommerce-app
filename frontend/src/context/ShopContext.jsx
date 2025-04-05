import { createContext, use, useEffect, useState } from 'react';
import { products } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);
    
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            try {
                if (cartItems[itemId] > 0) {
                    totalCount += cartItems[itemId];
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalCount;
    };

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount
    }
    
    return (
        <ShopContext.Provider value={value}> 
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;