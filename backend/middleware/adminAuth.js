import jwt from 'jsonwebtoken'

const adminAuth = async(req, res, next) => {
    try{
        const { token } = req.headers
        if(!token){
            return res.json({success:false, message:"No tienes autorización. Inicia sesión de nuevo."})
        }
        const token_decodev = jwt.verify(token,process.env.JWT_SECRET)
        if(token_decodev !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"No tienes autorización. Inicia sesión de nuevo."})
        }
        next()
    }catch (error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default adminAuth