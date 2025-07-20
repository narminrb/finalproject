import { Router } from "express";
import { createShopItem, getShopItems, getShopPageId } from "../../controllers/shopController/ShopController.js";


const router = Router();

router.get("/", getShopItems);
router.get("/:id", getShopPageId); 
router.post("/create", createShopItem);

export default router;