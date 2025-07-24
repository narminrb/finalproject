import { Router } from "express";
import { createHomePopular, deleteHomePopular, getHomePopular, updateHomePopular } from "../../../controllers/homeController/HomePopularController.js";


const router = Router();

router.get("/", getHomePopular);
router.post("/create", createHomePopular);
router.put("/update/:id", updateHomePopular);
router.delete("/delete/:id", deleteHomePopular);

export default router;