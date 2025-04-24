import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
      const { token } = req.headers;
      if (!token) {
        return res.json({ success: false, message: "No tienes autorización. Inicia sesión de nuevo." });
      }
  
      // Decodificar el token
      const token_decodev = jwt.verify(token, process.env.JWT_SECRET);
  
      // Verificar que el email coincida con el ADMIN_EMAIL
      if (token_decodev.email !== process.env.ADMIN_EMAIL) {
        return res.json({ success: false, message: "No tienes autorización. Inicia sesión de nuevo." });
      }
  
      // Pasar al siguiente middleware
      next();
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

export default adminAuth;