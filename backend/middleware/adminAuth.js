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
    console.error("Error en adminAuth:", error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Sesión expirada. Inicia sesión nuevamente." });
    }

    return res.status(400).json({ success: false, message: "Token inválido." });
  }
};
export default adminAuth;