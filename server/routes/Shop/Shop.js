import { Router } from "express";
import { createShopItem, deleteShopItem, getShopItems, getShopPageId, updateShopItem } from "../../controllers/shopController/ShopController.js";


const router = Router();

router.get("/", getShopItems);
router.get("/:id", getShopPageId); 
router.post("/create", createShopItem);
router.put("/update/:id", updateShopItem);   // ✅ update
router.delete("/delete/:id",deleteShopItem ); 

export default router;