import { Router } from "express";
import { createHomeCategory, getHomeCategory } from "../../../controllers/homeController/HomeCategoryController.js";


const router = Router();

router.get("/", getHomeCategory);
router.post("/create", createHomeCategory);

export default router;