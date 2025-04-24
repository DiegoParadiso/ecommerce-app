import userModel from "../models/userModel"

const addToCart = async (req, res) => {
    try{
        const { userId, itemId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId]){
                cartData[itemId] += 1
            }else{
                cartData[itemId] = 1
            }
        }else{
            cartData[itemId] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: 'Añadido al carrito'})
    }catch{
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateCart = async (req, res) => {
    try{
        const { userId, itemId, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: 'Carrito actualizado'})

    }catch{
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getUserCart = async (req, res) => {
    try{
        const { userId } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json ({ success: true, cartData })
    }catch{
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}