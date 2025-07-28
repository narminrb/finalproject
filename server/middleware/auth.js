import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) return res.status(401).json({ message: 'Unauthorized — No token in cookie' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.userId = decoded.id; 
    next();
  });
};

export default authMiddleware;
