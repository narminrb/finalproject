import { Router } from "express";
import { createHomePopular, getHomePopular } from "../../../controllers/homeController/HomePopularController.js";


const router = Router();

router.get("/", getHomePopular);
router.post("/create", createHomePopular);

export default router;