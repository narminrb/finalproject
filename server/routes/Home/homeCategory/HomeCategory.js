import { Router } from "express";
import { createHomeCategory, deleteHomeCategory, getHomeCategory, updateHomeCategory } from "../../../controllers/homeController/HomeCategoryController.js";


const router = Router();

router.get("/", getHomeCategory);
router.post("/create", createHomeCategory);
router.put("/update/:id", updateHomeCategory);
router.delete("/delete/:id", deleteHomeCategory);

export default router;