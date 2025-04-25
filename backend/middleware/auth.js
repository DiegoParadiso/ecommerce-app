import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const token = req.headers.token; 

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token no proporcionado. Inicia sesión de nuevo.' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: 'Token inválido o expirado.' });
    }
};

export default authUser;