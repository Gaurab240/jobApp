// Middleware to verify JWT token
import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }
  
    jwt.verify(token.split(' ')[1], "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
      req.userId = decoded.id; // Attach user ID to request object
      next();
    });
  };