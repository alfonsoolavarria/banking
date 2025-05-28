const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // si el prefijo 'Bearer ' está presente lo quito
  const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

  try {
    
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 

  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = verifyToken;
