import { Router } from "express";
import { createCheckoutSession } from "../../controllers/StripeController/StripeController.js";
import authMiddleware from "../../middleware/auth.js";
const router = Router();



router.post('/create-checkout-session', authMiddleware, createCheckoutSession);

export default router;