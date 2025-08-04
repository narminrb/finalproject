import express from "express";
import { login, logout, register, verify } from "../../controllers/auth/AuthController.js";
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify", verify);
router.get('/check', (req, res) => {
    const token = req.cookies.token; 
  
    if (!token) {
      return res.status(401).json({ authenticated: false, message: 'No token found' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
  
      return res.json({ authenticated: true, userId: decoded.id });
    } catch (err) {
      return res.status(401).json({ authenticated: false, message: 'Invalid token' });
    }
  });

export default router;
