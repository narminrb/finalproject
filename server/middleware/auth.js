// const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; 
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is invalid or expired' });
//   }
// };

// module.exports = protect;
// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization; // Expect 'Bearer token...'
//   if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ message: 'Invalid token' });
//     req.userId = decoded.id;
//     next();
//   });
// };

// export default authMiddleware;


import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // ✅ get from cookie

  if (!token) return res.status(401).json({ message: 'Unauthorized — No token in cookie' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.userId = decoded.id; // you can pass this to controller
    next();
  });
};

export default authMiddleware;
