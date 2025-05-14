import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
        const { itemId, userId } = req.body;

        console.log("Received itemId:", itemId);

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        console.log("Updated cartData:", cartData);
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Añadido al carrito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { itemId, quantity, userId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        let cartData = userData.cartData || {};
        cartData[itemId] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Carrito actualizado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        let cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };