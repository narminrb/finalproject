import { Router } from "express";
import { createShopItem, getShopItems } from "../../controllers/shopController/ShopController.js";


const router = Router();

router.get("/", getShopItems);
router.post("/create", createShopItem);

export default router;