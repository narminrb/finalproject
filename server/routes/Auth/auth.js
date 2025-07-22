import express from "express";
import { login, logout, register } from "../../controllers/auth/AuthController.js";
import jwt from 'jsonwebtoken';
const { verify } = jwt;

// import { login, register, logout, verify } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify", verify);

export default router;
