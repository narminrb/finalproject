// import express from 'express';
// import { addToCart, getCart } from '../../controllers/shopController/CartController';


// const router = express.Router();

// router.post('/add', addToCart);
// router.get('/:userId', getCart);

// export default router;
import express from 'express';
import { addToCart, getCart } from '../../controllers/shopController/CartController.js';

const router = express.Router();

// Protect these routes so only logged-in users can add/get cart
router.post('/add', addToCart);
router.get('/:userId', getCart);

export default router;
