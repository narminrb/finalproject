import express from "express";
import { login, logout, register, verify } from "../../controllers/auth/AuthController.js";
import jwt from 'jsonwebtoken';


// import { login, register, logout, verify } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify", verify);
router.get('/check', (req, res) => {
    const token = req.cookies.token; // read token from cookie
  
    if (!token) {
      return res.status(401).json({ authenticated: false, message: 'No token found' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token using your secret
  
      // token valid, user authenticated
      return res.json({ authenticated: true, userId: decoded.id });
    } catch (err) {
      // invalid token or expired
      return res.status(401).json({ authenticated: false, message: 'Invalid token' });
    }
  });

export default router;
