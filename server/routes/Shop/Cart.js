import express from 'express';

import authMiddleware from '../../middleware/auth.js'
import { addToCart, getCart, removeFromCart, updateCartItemQty } from '../../controllers/shopController/CartController.js';

const router = express.Router();

router.post('/add', authMiddleware, addToCart); 
router.get('/', authMiddleware, getCart); 
router.delete('/:productId', authMiddleware, removeFromCart);
router.put('/update', authMiddleware, updateCartItemQty);


export default router;

